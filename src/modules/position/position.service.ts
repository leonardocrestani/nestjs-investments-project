import { ForbiddenException, Injectable } from '@nestjs/common';
import { isValid as isValidCpf } from '@fnando/cpf';
import { IPosition, UserService } from '../user/user.service';
import calculateOffsets from 'src/common/utils/calcultateOffsets';

export interface IPositionResult {
  positions: IPosition[],
  limit: number,
  pages: number,
  page: number
}

@Injectable()
export class PositionService {
  constructor(private readonly userService: UserService) { }

  async findOne(document: string, limit: string, offset: string): Promise<IPositionResult> {
    const limitNumber = parseInt(limit);
    const offsetNumber = parseInt(offset);
    try {
      if (!isValidCpf(document)) {
        throw new ForbiddenException('Invalid CPF');
      }
      const position = await this.userService.findPosition({ cpf: document });
      if (!position) {
        throw new ForbiddenException('Unexistent client position');
      }
      const totalPositions = { total: position.length }
      const pages = calculateOffsets(limitNumber, offsetNumber, totalPositions.total);
      const newPositions = position.slice(0, limitNumber)
      return Object.assign({ positions: newPositions }, totalPositions, { limit: limitNumber, page: offsetNumber + 1, pages });
    } catch (error) {
      throw error;
    }
  }
}
