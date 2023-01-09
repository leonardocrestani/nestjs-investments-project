import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../authenticate/jwt-auth.guard';
import { UpdateTrendDto } from './dto/update-trend.dto';
import { TrendsService } from './trends.service';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    return await this.trendsService.findAll(limit, offset);
  }

  @Patch(':symbol')
  @UseGuards(JwtAuthGuard)
  async update(@Param('symbol') symbol: string, @Body() data: UpdateTrendDto) {
    return await this.trendsService.update(symbol, data);
  }
}
