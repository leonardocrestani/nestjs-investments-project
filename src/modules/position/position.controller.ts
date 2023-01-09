import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authenticate/jwt-auth.guard';
import {
  IAllPositionsResult,
  IPositionResult,
  PositionService,
} from './position.service';

@Controller('userPosition')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/all/:document')
  @UseGuards(JwtAuthGuard)
  async findAllPositionsByUser(
    @Param('document') document: string,
  ): Promise<IAllPositionsResult> {
    return await this.positionService.findAllPositionsByUser(document);
  }

  @Get('/paginated/:document')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('document') document: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<IPositionResult> {
    return await this.positionService.findOnePosition(document, limit, offset);
  }
}
