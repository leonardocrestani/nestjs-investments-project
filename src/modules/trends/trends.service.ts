import { Injectable, NotFoundException } from '@nestjs/common';
import recauculateConsolidated from 'src/common/utils/recauculateConsolidated';
import { UserRepository } from '../user/user.repository';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { TrendsRepository } from './trends.repository';

@Injectable()
export class TrendsService {
  constructor(
    private readonly trendRepository: TrendsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll() {
    try {
      return await this.trendRepository.findAll();
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
        throw new NotFoundException('Trend nao encontrada');
      }
      await this.trendRepository.update(symbol, data);
      const users = await this.userRepository.findAll();
      users.map(async (user) => {
        user.positions.map(async (position: any) => {
          if (position.symbol === symbol) {
            position.currentPrice = data.currentPrice;
          }
        });
        user.consolidated = recauculateConsolidated(user);
        await this.userRepository.update({ cpf: user.cpf }, user);
      });
      return await this.trendRepository.update(symbol, data);
    } catch (error) {
      throw error;
    }
  }
}
