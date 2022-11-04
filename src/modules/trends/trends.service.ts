import { Injectable } from '@nestjs/common';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { TrendsRepository } from './trends.repository';

@Injectable()
export class TrendsService {
  constructor(private readonly trendRepository: TrendsRepository) {}

  async findAll() {
    return await this.trendRepository.findAll();
  }

  async findOne(symbol: string) {
    return await this.trendRepository.findOne(symbol);
  }

  async update(symbol: string, data: UpdateTrendDto) {
    return this.trendRepository.update(symbol, data);
  }
}
