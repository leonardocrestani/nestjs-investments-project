import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserService } from '../user/user.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface AuthResult {
  access_token: string;
  user: string;
}

@Injectable()
export class AuthenticateService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: AuthenticateDto): Promise<AuthResult> {
    const user: any = await this.userService.findOne({
      document: data.document,
    });
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Unauthorized');
    }
    const token = await this.jwtService.sign({
      id: user._id,
      document: user.document,
    });
    return { user: user, access_token: token };
  }
}
