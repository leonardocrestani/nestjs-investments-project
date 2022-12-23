import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  IAllPositionsResult,
  IPositionResult,
  PositionService,
} from './position.service';

@Controller('userPosition')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/all/:document')
  async findAllPositionsByUser(
    @Param('document') document: string,
  ): Promise<IAllPositionsResult> {
    return await this.positionService.findAllPositionsByUser(document);
  }

  @Get('/paginated/:document')
  async findOne(
    @Param('document') document: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<IPositionResult> {
    return await this.positionService.findOnePosition(document, limit, offset);
  }
}
