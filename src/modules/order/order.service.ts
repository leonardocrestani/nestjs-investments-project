import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import calculateConsolidatedAndBalance from '../../common/utils/calculateConsolidatedAndBalance';
import { UserService } from '../user/user.service';
import { TrendsService } from '../trends/trends.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly trendsService: TrendsService,
    private readonly userService: UserService,
  ) { }

  async order(document: string, data: CreateOrderDto) {
    const trend = await this.trendsService.findOne(data.symbol);
    if (!trend) {
      throw new NotFoundException('Invalid trend');
    }
    const userPosition = await this.userService.findPosition({ cpf: document });
    if (trend.currentPrice * data.amount > userPosition.checkingAccountAmount) {
      throw new ForbiddenException('Insuficient funds');
    }
    try {
      const orderedTrend = Object.assign({}, trend, { amount: data.amount });
      const newUserPosition = calculateConsolidatedAndBalance(
        userPosition,
        orderedTrend,
      );
      return await this.userService.update({ cpf: document }, newUserPosition);
    } catch (error) {
      throw error;
    }
  }
}
