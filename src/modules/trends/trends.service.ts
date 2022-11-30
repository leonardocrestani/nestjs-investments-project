import { Injectable, NotFoundException } from '@nestjs/common';
import recauculateConsolidated from '../../common/utils/recauculateConsolidated';
import { UserService } from '../user/user.service';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { TrendsRepository } from './trends.repository';

@Injectable()
export class TrendsService {
  constructor(
    private readonly trendRepository: TrendsRepository,
    private readonly userService: UserService,
  ) { }

  async findAll() {
    try {
      const trends = await this.trendRepository.findAll();
      return trends
    } catch (error) {
      throw error;
    }
  }

  async findOne(symbol: string) {
    try {
      return await this.trendRepository.findOne(symbol);
    } catch (error) {
      throw error;
    }
  }

  async update(symbol: string, data: UpdateTrendDto) {
    try {
      const trend = await this.trendRepository.findOne(symbol);
      if (!trend) {
        throw new NotFoundException('Trend not found');
      }
      const users = await this.userService.findAll();
      users.map(async (user) => {
        user.positions.map(async (position: any) => {
          if (position.symbol === symbol) {
            position.currentPrice = data.currentPrice;
          }
        });
        user.consolidated = recauculateConsolidated(user);
        await this.userService.update({ cpf: user.cpf }, user);
      });
      const update = await this.trendRepository.update(symbol, data);
      return update;
    } catch (error) {
      throw error;
    }
  }
}
