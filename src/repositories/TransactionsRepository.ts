import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const incomes = await this.find({
      where: { type: 'income' },
    });

    const incomeValues = incomes.map(income => income.value);

    const totalIncome = incomeValues.reduce((acc, obj) => {
      return acc + obj;
    }, 0);

    const outcomes = await this.find({
      where: { type: 'outcome' },
    });
    const outcomeValues = outcomes.map(income => income.value);

    const totalOutcome = outcomeValues.reduce((acc, obj) => {
      return acc + obj;
    }, 0);

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }
}

export default TransactionsRepository;
