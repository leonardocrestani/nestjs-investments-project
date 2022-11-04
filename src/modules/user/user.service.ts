import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { isValid as isValidCpf } from '@fnando/cpf';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    if (!isValidCpf(data.cpf)) {
      throw new ForbiddenException('CPF invalido');
    }
    if (data.account.length !== 6) {
      throw new ForbiddenException('Numero de conta invalido');
    }
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(document: string) {
    try {
      return await this.userRepository.findOne({ cpf: document });
    } catch (error) {
      throw error;
    }
  }
}
