import { Controller, Get, Param, Query } from '@nestjs/common';
import { IResult, PositionService } from './position.service';

@Controller('userPosition')
export class PositionController {
  constructor(private readonly positionService: PositionService) { }

  @Get(':document')
  async findOne(@Param('document') document: string, @Query('limit') limit: string, @Query('offset') offset: string): Promise<IResult> {
    return await this.positionService.findOne(document, limit, offset);
  }
}
