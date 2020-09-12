import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if (!["income", "outcome"].includes(type)){
      throw new Error('It is not a valid transaction!');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value){
      throw new Error('You do not have enouth cash!');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
    // TODO
  }
}

export default CreateTransactionService;
