import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.secretKey,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, UserService, JwtStrategy],
})
export class AuthenticateModule {}
