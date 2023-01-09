import { IsEnum, IsNumber, IsObject, Min } from 'class-validator';
import { TRANSACTIONS } from '../../../common/enums/transactions.enum';

type target = {
  bank: string;
  branch: string;
  account: string;
};

type origin = {
  bank: string;
  branch: string;
  document: string;
};

export class CreateTransactionDto {
  @IsEnum(TRANSACTIONS)
  event: TRANSACTIONS;
  document: string;
  @IsNumber()
  @Min(1)
  amount: number;

  constructor(event: TRANSACTIONS, document: string, amount: number) {
    this.event = event;
    this.document = document;
    this.amount = amount;
  }
}
