import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('spb')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/events')
  async create(@Body() data: CreateTransactionDto) {
    return await this.transactionsService.create(data);
  }
}
