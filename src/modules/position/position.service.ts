import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { isValid as isValidCpf } from '@fnando/cpf';

@Injectable()
export class PositionService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(document: string) {
    try {
      if (!isValidCpf(document)) {
        throw new ForbiddenException('CPF invalido');
      }
      return this.userRepository.findPosition(document);
    } catch (error) {
      throw error;
    }
  }
}
