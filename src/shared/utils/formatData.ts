export const formatMoneyToNumber = (money: string): number => {
  const moneyWithoutMask = money.replace(/\D/g, '');
  return Number(moneyWithoutMask) / 100;
};
