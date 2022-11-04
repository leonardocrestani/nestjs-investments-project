import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { TrendsRepository } from './trends.repository';

@Injectable()
export class TrendsService {
  constructor(private readonly trendRepository: TrendsRepository) {}

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
      return await this.trendRepository.update(symbol, data);
    } catch (error) {
      throw error;
    }
  }
}
