import { ForbiddenException, Injectable } from '@nestjs/common';
import { isValid as isValidCpf } from '@fnando/cpf';
import { UserService } from '../user/user.service';

@Injectable()
export class PositionService {
  constructor(private readonly userService: UserService) {}

  async findOne(document: string) {
    try {
      if (!isValidCpf(document)) {
        throw new ForbiddenException('Invalid CPF');
      }
      const position = await this.userService.findPosition({ cpf: document });
      if (!position) {
        throw new ForbiddenException('Unexistent client position');
      }
      return position;
    } catch (error) {
      throw error;
    }
  }
}
