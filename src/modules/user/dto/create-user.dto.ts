import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome_completo: string;
  @IsString()
  cpf: string;
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  account: string;
}
