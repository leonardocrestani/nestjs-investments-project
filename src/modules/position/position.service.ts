import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class PositionService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(document: string) {
    return this.userRepository.findPosition(document);
  }
}
