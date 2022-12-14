import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  symbol: string;
  @IsNumber()
  @Min(1)
  amount: number;

  constructor(symbol: string, amount: number) {
    this.symbol = symbol;
    this.amount = amount;
  }
}
