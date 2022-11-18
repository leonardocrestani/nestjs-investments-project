import { TRANSACTIONS } from '../enums/transactions.enum';
import { CreateTransactionDto } from '../../modules/transactions/dto/create-transaction.dto';

export const createTransationMock: any = new CreateTransactionDto(
  TRANSACTIONS.TRANSFER,
  {
    bank: '352',
    branch: '0001',
    account: '123456',
  },
  {
    bank: '033',
    branch: '03312',
    cpf: '53926221941',
  },
  1000,
);
