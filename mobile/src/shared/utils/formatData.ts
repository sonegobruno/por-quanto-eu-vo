import { MaskService, TextInputMaskOptionProp } from 'react-native-masked-text';

export const formatMoneyToNumber = (money: string): number => {
  const moneyWithoutMask = money.replace(/\D/g, '');
  return Number(moneyWithoutMask) / 100;
};

export function formatCurrency(
  price = 0,
  options?: TextInputMaskOptionProp,
): string {
  return MaskService.toMask('money', price?.toFixed(2), options);
}
