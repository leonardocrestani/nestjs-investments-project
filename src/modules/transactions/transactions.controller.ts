import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../authenticate/jwt-auth.guard';

@Controller('spb')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/events')
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CreateTransactionDto) {
    return await this.transactionsService.create(data);
  }
}
