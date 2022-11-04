import { Controller, Get, Param } from '@nestjs/common';
import { PositionService } from './position.service';

@Controller('userPosition')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get(':document')
  findOne(@Param('document') document: string) {
    return this.positionService.findOne(document);
  }
}
