import { getCustomRepository, getRepository } from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface NewTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}
interface Request {
  filename: string;
}

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const csvFilePath = path.resolve(__dirname, '..', '..', 'tmp', filename);

    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const newTransactions: NewTransaction[] = [];

    parseCSV.on('data', line => {
      const [title, type, value, category] = Object.keys(
        line,
      ).map((cell: string) => line[cell].trim());

      newTransactions.push({ title, type, value, category });
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const newTransactionsList: Transaction[] = [];

    const promises = newTransactions.map(async line => {
      let checkCategoryExists = await categoriesRepository.findOne({
        where: { title: line.category },
      });

      if (!checkCategoryExists) {
        checkCategoryExists = categoriesRepository.create({
          title: line.category,
        });

        await categoriesRepository.save(checkCategoryExists);
      }

      const repository = transactionsRepository.create({
        title: line.title,
        value: line.value,
        type: line.type,
        category_id: checkCategoryExists.id,
      });

      await transactionsRepository.save(repository);

      newTransactionsList.push(repository);
    });

    await Promise.all(promises);

    return newTransactionsList;
  }
}

export default ImportTransactionsService;
