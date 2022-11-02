import { AppError } from 'shared/error/AppError';
import { isNumber, isString, isTruthy } from './typeGuards';

export function isKey<T extends string>(
  input: string | undefined | null,
  keys: string[],
): input is T {
  return isString(input) && keys.includes(input);
}

export function toNumber(value: string, field = ''): number {
  const parsedNumber = Number(value);

  if (!isNumber(parsedNumber) || !isTruthy(parsedNumber))
    throw new AppError('Não é um número válido', field);

  return parsedNumber;
}
