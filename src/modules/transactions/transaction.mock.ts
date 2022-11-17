import { CreateTransactionDto } from './dto/create-transaction.dto';

export const createTransationMock: any = new CreateTransactionDto(
  'TRANSFER',
  {
    bank: '352',
    branch: '0001',
    account: '123457',
  },
  {
    bank: '033',
    branch: '03312',
    cpf: '08000700034',
  },
  1000,
);
