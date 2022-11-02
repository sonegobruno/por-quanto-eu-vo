import { MaskService, TextInputMaskOptionProp } from 'react-native-masked-text';
import { toNumber } from 'shared/types/utils';

export const formatMoneyToNumber = (money: string, field = ''): number => {
  const moneyWithoutMask = money.replace(/\D/g, '');

  return toNumber(moneyWithoutMask, field) / 100;
};

export function formatCurrency(
  price = 0,
  options?: TextInputMaskOptionProp,
): string {
  return MaskService.toMask('money', price?.toFixed(2), options);
}
