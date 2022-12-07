import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { TrendsService } from './trends.service';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) { }

  @Get()
  async findAll(@Query('limit') limit: string, @Query('offset') offset: string) {
    return await this.trendsService.findAll(limit, offset);
  }

  @Patch(':symbol')
  async update(@Param('symbol') symbol: string, @Body() data: UpdateTrendDto) {
    return await this.trendsService.update(symbol, data);
  }
}
