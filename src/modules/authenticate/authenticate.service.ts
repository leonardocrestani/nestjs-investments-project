import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UserService } from '../user/user.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticateService {
  constructor(private readonly userService: UserService) {}

  async auth(data: AuthenticateDto): Promise<User> {
    const user: any = await this.userService.findOne({ cpf: data.document });
    if (!user) {
      throw new NotFoundException('Could not authenticate, user not found');
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new ForbiddenException('Invalid password');
    }
    return user;
  }
}
