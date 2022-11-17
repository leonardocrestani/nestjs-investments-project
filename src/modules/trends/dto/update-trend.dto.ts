import { IsNumber, Min } from 'class-validator';
export class UpdateTrendDto {
  @IsNumber()
  @Min(0)
  currentPrice: number;

  constructor(currentPrice: number) {
    this.currentPrice = currentPrice;
  }
}
