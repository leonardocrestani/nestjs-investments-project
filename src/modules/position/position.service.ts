import { ForbiddenException, Injectable } from '@nestjs/common';
import { isValid as isValidCpf } from '@fnando/cpf';
import { IPosition, UserService } from '../user/user.service';
import calculateOffsets from 'src/common/utils/calcultateOffsets';

export interface IResult {
  checkingAccountAmount: number
  positions: IPosition[],
  consolidated: number
  limit: number,
  pages: number,
  page: number
}

@Injectable()
export class PositionService {
  constructor(private readonly userService: UserService) { }

  async findOne(document: string, limit: string, offset: string): Promise<IResult> {
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
      const totalPositions = { total: position.positions.length }
      const pages = calculateOffsets(limitNumber, offsetNumber, totalPositions.total);
      const newPositions = position.positions.slice(0, limitNumber)
      return Object.assign({ checkingAccountAmount: position.checkingAccountAmount, positions: newPositions, consolidated: position.consolidated }, totalPositions, { limit: limitNumber, page: offsetNumber + 1, pages });
    } catch (error) {
      throw error;
    }
  }
}
