import { Injectable } from '@nestjs/common';
import { TrendsRepository } from '../trends/trends.repository';
import { UserRepository } from '../user/user.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import calculateConsolidatedAndBalance from 'src/common/utils/calculateConsolidatedAndBalance';

@Injectable()
export class OrderService {
  constructor(
    private readonly trendRepository: TrendsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async order(document: string, data: CreateOrderDto) {
    const trend = await this.trendRepository.findOne(data.symbol);
    if (!trend) {
      throw new Error('Ativo invalido');
    }
    const userPosition = await this.userRepository.findPosition(document);
    if (trend.currentPrice * data.amount > userPosition.checkingAccountAmount) {
      throw new Error('Saldo insuficiente');
    }
    const orderedTrend = Object.assign({}, trend, { amount: data.amount });
    const newUserPosition = calculateConsolidatedAndBalance(
      userPosition,
      orderedTrend,
    );
    return await this.userRepository.update({ cpf: document }, newUserPosition);
  }
}
