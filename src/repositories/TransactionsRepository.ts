import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce<Balance>(
      (result, currentValue) => {
        const newResult = {
          ...result,
          [currentValue.type]: result[currentValue.type] + currentValue.value,
        };

        return {
          ...newResult,
          total: newResult.income - newResult.outcome,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({
    title,
    value,
    type,
  }: ConstructorParameters<typeof Transaction>[0]): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
