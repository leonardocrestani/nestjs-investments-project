import { isValid as isValidCpf } from '@fnando/cpf';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpfValidator', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(cpf: string) {
    return isValidCpf(cpf) ? true : false;
  }

  defaultMessage() {
    return 'Invalid CPF';
  }
}
