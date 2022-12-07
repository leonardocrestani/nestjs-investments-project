import { TRANSACTIONS } from '../enums/transactions.enum';
import { CreateTransactionDto } from '../../modules/transactions/dto/create-transaction.dto';

export const createTransationMock: any = new CreateTransactionDto(
  TRANSACTIONS.TRANSFER,
  '08000700034',
  1000,
);
