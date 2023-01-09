import { isValid as isValidCpf } from '@fnando/cpf';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpfValidator', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(document: string) {
    return isValidCpf(document) ? true : false;
  }

  defaultMessage() {
    return 'Invalid CPF';
  }
}
