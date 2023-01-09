import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticateService, AuthResult } from './authenticate.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post('/login')
  auth(@Body() authenticateDto: AuthenticateDto): Promise<AuthResult> {
    return this.authenticateService.login(authenticateDto);
  }
}
