import { Injectable, NotFoundException } from '@nestjs/common';
import calculateOffsets from '../../common/utils/calcultateOffsets';
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

  async findAll(limit: string, offset: string) {
    try {
      const limitNumber = parseInt(limit);
      const offsetNumber = parseInt(offset) - 1;
      const trends = await this.trendRepository.findAll(
        limitNumber,
        offsetNumber,
      );
      const total = { total: await this.trendRepository.countTrends() };
      const pages = calculateOffsets(limitNumber, offsetNumber, total.total);
      return Object.assign({ trends }, total, {
        limit: limitNumber,
        page: offsetNumber,
        pages,
      });
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
