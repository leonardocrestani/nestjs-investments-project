import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly userService: UserService) {}

  async create(data: CreateTransactionDto): Promise<void> {
    const user = await this.userService.findOne({
      account: data.target.account,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (data.origin.cpf !== user.cpf) {
      throw new ForbiddenException('Incorrect CPF');
    }
    try {
      data.amount += user.checkingAccountAmount;
      await this.userService.update(
        { account: data.target.account },
        { checkingAccountAmount: data.amount, consolidated: data.amount },
      );
    } catch (error) {
      throw error;
    }
  }
}
