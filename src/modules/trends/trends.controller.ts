import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { TrendsService } from './trends.service';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Get()
  findAll() {
    return this.trendsService.findAll();
  }

  @Patch(':symbol')
  update(@Param('symbol') symbol: string, @Body() data: UpdateTrendDto) {
    return this.trendsService.update(symbol, data);
  }
}
