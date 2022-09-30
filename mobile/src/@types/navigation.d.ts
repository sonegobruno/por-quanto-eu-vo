type GasPriceShowParams = {
  amountCurrency: number;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      GasPriceShow: GasPriceShowParams;
      Login: undefined;
      CreateUser: undefined;
      CreateCar: undefined;
    }
  }
}
