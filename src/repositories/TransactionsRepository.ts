import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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

  private getIncome(): number {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, current) => {
        return sum + current.value;
      }, 0);
    return income;
  }

  private getOutcome(): number {
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, current) => {
        return sum + current.value;
      }, 0);

    return outcome;
  }

  private getTotal(income?: number, outcome?: number): number {
    return (income || this.getIncome()) - (outcome || this.getOutcome());
  }

  public getBalance(): Balance {
    const income = this.getIncome();
    const outcome = this.getOutcome();
    const total = this.getTotal(income, outcome);

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
