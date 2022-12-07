import { Controller, Get, Param, Query } from '@nestjs/common';
import { IPositionResult, PositionService } from './position.service';

@Controller('userPosition')
export class PositionController {
  constructor(private readonly positionService: PositionService) { }

  @Get(':document')
  async findOne(@Param('document') document: string, @Query('limit') limit: string, @Query('offset') offset: string): Promise<IPositionResult> {
    return await this.positionService.findOne(document, limit, offset);
  }
}
