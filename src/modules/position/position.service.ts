import { ForbiddenException, Injectable } from '@nestjs/common';
import { isValid as isValidCpf } from '@fnando/cpf';
import { IPosition, UserService } from '../user/user.service';
import calculateOffsets from '../../common/utils/calcultateOffsets';

export interface IPositionResult {
  checkingAccountAmount: number;
  positions: IPosition[];
  consolidated: number;
  limit: number;
  pages: number;
  page: number;
}

export interface IAllPositionsResult {
  checkingAccountAmount: number;
  positions: IPosition[];
  consolidated: number;
}

@Injectable()
export class PositionService {
  constructor(private readonly userService: UserService) {}

  async findAllPositionsByUser(document: string): Promise<IAllPositionsResult> {
    try {
      if (!isValidCpf(document)) {
        throw new ForbiddenException('Invalid CPF');
      }
      const position = await this.userService.findPosition({ document });
      if (!position) {
        throw new ForbiddenException('Unexistent client position');
      }
      return position;
    } catch (error) {
      throw error;
    }
  }

  async findOnePosition(
    document: string,
    limit: string,
    offset: string,
  ): Promise<IPositionResult> {
    const limitNumber = parseInt(limit);
    const offsetNumber =
      parseInt(offset) === 0 ? parseInt(offset) : parseInt(offset) - 1;
    try {
      if (!isValidCpf(document)) {
        throw new ForbiddenException('Invalid CPF');
      }
      const position = await this.userService.findPosition({ document });
      console.log(position, 'DENTRO');
      if (!position) {
        throw new ForbiddenException('Unexistent client position');
      }
      const totalPositions = { total: position.positions.length };
      console.log(totalPositions, 'TOTAL');
      const pages = calculateOffsets(
        limitNumber,
        offsetNumber,
        totalPositions.total,
      );
      console.log(pages, 'PAGES');
      console.log(limitNumber, 'LIMIT');
      console.log(position.positions, 'POSTIONS');
      const newPositions = position.positions.slice(0, limitNumber);
      console.log(newPositions, 'NEW POSI');
      return Object.assign(
        {
          checkingAccountAmount: position.checkingAccountAmount,
          positions: newPositions,
          consolidated: position.consolidated,
        },
        totalPositions,
        { limit: limitNumber, page: offsetNumber + 1, pages },
      );
    } catch (error) {
      throw error;
    }
  }
}
