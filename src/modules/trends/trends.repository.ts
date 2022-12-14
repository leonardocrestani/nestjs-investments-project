import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { Trend } from './entities/trend.entity';

@Injectable()
export class TrendsRepository {
  constructor(@InjectModel('Trend') private trendModel: Model<Trend>) { }

  async findAll(limit: number, offset: number): Promise<Trend[]> {
    const trends = await this.trendModel.find().select([]).limit(limit).skip(offset);
    return trends;
  }

  async findOne(symbol: string): Promise<Trend> {
    return await this.trendModel.findOne({ symbol }).select('-_id').lean();
  }

  async countTrends(): Promise<number> {
    return await this.trendModel.count()
  }

  async update(symbol: string, data: UpdateTrendDto): Promise<Trend> {
    const updatedTrend = await this.trendModel.findOneAndUpdate(
      { symbol: symbol },
      data,
      {
        new: true,
      },
    );
    return updatedTrend;
  }
}
