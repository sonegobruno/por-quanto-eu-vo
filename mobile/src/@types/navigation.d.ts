type GasPriceShowParams = {
  amountCurrency: number;
};

type CreateAndEditCarParams = {
  from: 'create' | 'edit';
  carId?: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      GasPriceShow: GasPriceShowParams;
      Login: undefined;
      CreateUser: undefined;
      CreateAndEditCar: CreateAndEditCarParams;
    }
  }
}
