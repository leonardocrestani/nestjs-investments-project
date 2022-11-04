import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { isValid as isValidCpf } from '@fnando/cpf';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    if (!isValidCpf(data.cpf)) {
      throw new Error('CPF invalido');
    }
    if (data.account.length !== 6) {
      throw new Error('Numero de conta invalido');
    }
    const user = await this.userRepository.create(data);
    return user;
  }

  async findOne(document: string) {
    return await this.userRepository.findOne({ cpf: document });
  }
}
