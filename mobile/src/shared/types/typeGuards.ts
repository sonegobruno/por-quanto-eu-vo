/* eslint-disable eqeqeq */
import { Falsy } from 'react-native';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';
export const isError = (value: unknown): value is Error =>
  value instanceof Error;
export const isObject = (value: unknown): value is object =>
  typeof value === 'object';

type Truthy<T> = Exclude<T, Falsy>;
export const isTruthy = <T>(value: T): value is Truthy<T> => !!value;
