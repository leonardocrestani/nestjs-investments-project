import { IsEnum, IsNumber, IsObject, Min } from 'class-validator';
import { TRANSACTIONS } from 'src/common/enums/transactions.enum';

type target = {
  bank: string;
  branch: string;
  account: string;
};

type origin = {
  bank: string;
  branch: string;
  cpf: string;
};

export class CreateTransactionDto {
  @IsEnum(TRANSACTIONS)
  event: TRANSACTIONS;
  @IsObject()
  target: target;
  @IsObject()
  origin: origin;
  @IsNumber()
  @Min(1)
  amount: number;
}
