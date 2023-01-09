import { IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { CpfValidator } from '../../../common/validators/cpf-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsString()
  @Validate(CpfValidator)
  document: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  account: string;

  constructor(full_name: string, document: string, account: string) {
    (this.full_name = full_name),
      (this.document = document),
      (this.account = account);
  }
}
