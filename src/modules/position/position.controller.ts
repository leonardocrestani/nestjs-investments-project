import { Controller, Get, Param } from '@nestjs/common';
import { PositionService } from './position.service';

@Controller('userPosition')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get(':document')
  async findOne(@Param('document') document: string) {
    return await this.positionService.findOne(document);
  }
}
