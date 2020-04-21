import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';
// import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface Response {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Response> {
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new AppError('Não é possível registrar valor negativo.');
    }

    let checkCategoryExists = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExists) {
      checkCategoryExists = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(checkCategoryExists);
    }

    const repository = transactionsRepository.create({
      title,
      value,
      type,
      category_id: checkCategoryExists.id,
    });

    await transactionsRepository.save(repository);

    const responseObj = {
      id: repository.id,
      title: repository.title,
      value: repository.value,
      type: repository.type,
      category: checkCategoryExists.title,
    };

    return responseObj;
  }
}

export default CreateTransactionService;
