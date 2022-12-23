import { IsString, Validate } from 'class-validator';
import { CpfValidator } from '../../../common/validators/cpf-validator';

export class AuthenticateDto {
  @IsString()
  @Validate(CpfValidator)
  document: string;

  @IsString()
  password: string;
}
