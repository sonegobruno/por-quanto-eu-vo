import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { formatMoneyToNumber } from 'shared/utils/formatData';

import { InputMask } from 'shared/components/Form/Inputs/InputMask';
import { StatusBar } from 'shared/components/StatusBar';
import { Button } from 'shared/components/Form/Buttons/Button';
import { Input } from 'shared/components/Form/Inputs/Input';
import { HeaderWithMenu } from 'shared/components/Headers/HeaderWithMenu';
import { Heading } from 'shared/components/Heading';
import { Select } from 'shared/components/Form/Select';
import { useListMyCars } from 'services/react-query/hooks/listMyCars';
import { mapperCarToSelect } from 'mappers/carMapper';
import {
  ToggleButton,
  ToggleButtonItem,
} from 'shared/components/Form/ToggleButton';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import { useToast } from 'native-base';
import { toastConfig } from 'shared/components/Toast';
import { AppError } from 'shared/error/AppError';
import { isKey, toNumber } from 'shared/types/utils';
import * as S from './styles';

type FormValues = {
  car: string;
  fuel: 'alcoholConsumption' | 'gasConsumption';
  distance: string;
  gasAmount: string;
  demand: 'justGoing' | 'goingAndBacking';
};

const FormSchema = yup.object().shape({
  car: yup.string().required('Carro obrigatório'),
  fuel: yup.string().required('Combustível obrigatório'),
  distance: yup
    .string()
    .required('Distância obrigatória')
    .matches(
      /^\d*\.?\d{0,1}$/g,
      'Distância não é um número válido. Ex: 22.5, 22, 22.02',
    ),
  gasAmount: yup.string().required('Valor do combustível obrigatório'),
  demand: yup
    .string()
    .required('opsss, você esqueceu de selecionar uma cobrança'),
});

const FUEL_OPTIONS: ToggleButtonItem<FormValues['fuel']>[] = [
  { value: 'gasConsumption', label: 'Gasolina' },
  { value: 'alcoholConsumption', label: 'Álcool' },
];

// eslint-disable-next-line no-shadow
enum DEMAND_OPTIONS_ENUM {
  justGoing = 1,
  goingAndBacking = 2,
}

const DEMAND_OPTIONS: ToggleButtonItem<FormValues['demand']>[] = [
  { value: 'justGoing', label: 'Somente ida' },
  { value: 'goingAndBacking', label: 'Bate e volta' },
];

export function Home() {
  const toast = useToast();
  const form = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });
  const navigation = useNavigation();
  const { data, isLoading } = useListMyCars();

  const handleSumValues = useCallback(
    (formData: FormValues) => {
      const { distance, gasAmount, car, demand, fuel } = formData;
      try {
        const formattedGasAmount = formatMoneyToNumber(gasAmount, 'gasAmount');
        const carSelected = data?.find(dataMapped => dataMapped.id === car);

        if (!carSelected) {
          throw new AppError('Carro não encontrado', 'car');
        }

        const fuelFromCarSelected = carSelected[fuel];

        const spentGasLitens =
          toNumber(distance, 'distance') / fuelFromCarSelected;

        const spentAmount =
          spentGasLitens * formattedGasAmount * DEMAND_OPTIONS_ENUM[demand];

        navigation.navigate('GasPriceShow', {
          amountCurrency: spentAmount,
        });
      } catch (err) {
        const error = apiResponseErrors(err);
        toast.show(toastConfig(error.message, 'error'));
        if (isKey<keyof FormValues>(error.field, Object.keys(formData))) {
          form.setError(
            error.field,
            {
              message: error.message,
            },
            {
              shouldFocus: true,
            },
          );
        }
      }
    },
    [data, navigation, toast, form],
  );

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="#F8F9F9" />
      <S.Container>
        <HeaderWithMenu />
        <Heading
          title="Por Quanto Eu vou"
          subTitle={`Descubra o valor de combustível gasto ${'\n'}com facilidade`}
        />

        <Controller
          control={form.control}
          name="car"
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => {
            return (
              <Select
                label="Qual carro irá viajar?"
                modalTitle="Meus carros"
                options={mapperCarToSelect(data)}
                error={error}
                ref={ref}
                placeholder="Selecione o carro"
                onChangeSelectValue={onChange}
                selectValue={value}
                isLoading={isLoading}
                containerProps={{ mt: '4' }}
              />
            );
          }}
        />

        <Controller
          control={form.control}
          name="fuel"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <ToggleButton
                error={error}
                label="Qual combustivel irá utilizar?"
                onChangeValue={onChange}
                value={value}
                options={FUEL_OPTIONS}
              />
            );
          }}
        />

        <Input
          label="Distância a ser percorrida (km)"
          placeholder="Digite a distância"
          controller={{
            name: 'distance',
            control: form.control,
          }}
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => form.setFocus('gasAmount')}
        />

        <InputMask
          label="Qual o valor do combustível?"
          placeholder="R$ 00,00"
          controller={{
            name: 'gasAmount',
            control: form.control,
          }}
          maskType="money"
        />

        <Controller
          control={form.control}
          name="demand"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <ToggleButton
                error={error}
                label="Como cobrar?"
                onChangeValue={onChange}
                value={value}
                options={DEMAND_OPTIONS}
              />
            );
          }}
        />

        <Button
          title="Somar valores"
          onPress={form.handleSubmit(handleSumValues)}
          testID="sum-values-button"
          mt="4"
        />
      </S.Container>
    </>
  );
}
