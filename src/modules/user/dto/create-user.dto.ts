import { IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { CpfValidator } from '../../../common/validators/cpf-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsString()
  @Validate(CpfValidator)
  cpf: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  account: string;

  constructor(full_name: string, cpf: string, account: string) {
    (this.full_name = full_name), (this.cpf = cpf), (this.account = account);
  }
}
