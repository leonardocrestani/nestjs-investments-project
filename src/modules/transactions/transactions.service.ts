import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateTransactionDto): Promise<void> {
    const user = await this.userRepository.findOne({
      account: data.target.account,
    });
    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }
    if (data.origin.cpf !== user.cpf) {
      throw new ForbiddenException('Usuario incorreto');
    }
    try {
      data.amount += user.checkingAccountAmount;
      await this.userRepository.update(
        { account: data.target.account },
        { checkingAccountAmount: data.amount },
      );
    } catch (error) {
      throw error;
    }
  }
}
