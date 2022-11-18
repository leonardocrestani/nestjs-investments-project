import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { isValid as isValidCpf } from '@fnando/cpf';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreateUserDto) {
    const user = (await this.userRepository.findOne({ cpf: data.cpf }))
      ? await this.userRepository.findOne({ account: data.account })
      : undefined;
    if (user) {
      throw new ConflictException('User already exists');
    }
    if (!isValidCpf(data.cpf)) {
      throw new ForbiddenException('Invalid CPF');
    }
    if (data.account.length !== 6) {
      throw new ForbiddenException('Invalid account number');
    }
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(params: any) {
    try {
      return await this.userRepository.findOne(params);
    } catch (error) {
      throw error;
    }
  }

  async update(params: any, data: any) {
    try {
      return await this.userRepository.update(params, data);
    } catch (error) {
      throw error;
    }
  }

  async findPosition(params: any) {
    try {
      return await this.userRepository.findPosition(params);
    } catch (error) {
      throw error;
    }
  }
}
