import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  cpf: string;
  @IsString()
  symbol: string;
  @IsNumber()
  @Min(1)
  amount: number;
}
