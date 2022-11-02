import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { formatMoneyToNumber } from 'shared/utils/formatData';
import { AVERAGE_FUEL_CONSUMPTION } from 'shared/contants/averageFuelConsumption';

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
import * as S from './styles';
import { DemandWrapper } from './DemandWrapper';

type FormValues = {
  car: string;
  fuel: 'alcoholConsumption' | 'gasConsumption';
  distance: string;
  gasAmount: string;
};

type DemandOptionsProps = 'Somente ida' | 'Bate e volta';

const FormSchema = yup.object().shape({
  car: yup.string().required('Carro obrigatório'),
  fuel: yup.string().required('Combustível obrigatório'),
  distance: yup.string().required('Distância obrigatória'),
  gasAmount: yup.string().required('Valor do combustível obrigatório'),
});

const FUEL_OPTIONS: ToggleButtonItem<FormValues['fuel']>[] = [
  { value: 'gasConsumption', label: 'Gasolina' },
  { value: 'alcoholConsumption', label: 'Álcool' },
];

const DEMAND_OPTIONS = {
  'Somente ida': 1,
  'Bate e volta': 2,
};

export function Home() {
  const form = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });
  const navigation = useNavigation();
  const { data, isLoading } = useListMyCars();

  const [demandSelected, setDemandSelected] = useState<DemandOptionsProps | ''>(
    '',
  );
  const [showDemandError, setShowDemandError] = useState(false);

  useEffect(() => {
    if (demandSelected !== '') {
      setShowDemandError(false);
    }
  }, [demandSelected]);

  const handleSumValues = useCallback(
    ({ distance, gasAmount }: FormValues) => {
      if (demandSelected === '') {
        setShowDemandError(true);
        return;
      }

      const formattedGasAmount = formatMoneyToNumber(gasAmount);

      const spentGasLitens = Number(distance) / AVERAGE_FUEL_CONSUMPTION;

      const spentAmount =
        spentGasLitens * formattedGasAmount * DEMAND_OPTIONS[demandSelected];

      navigation.navigate('GasPriceShow', {
        amountCurrency: spentAmount,
      });
    },
    [demandSelected, navigation],
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

        <DemandWrapper
          demandSelected={demandSelected}
          onChangeDemandSelected={setDemandSelected}
          showError={showDemandError}
        />

        <Button
          title="Somar valores"
          onPress={form.handleSubmit(handleSumValues)}
          testID="sum-values-button"
          mt="12"
        />
      </S.Container>
    </>
  );
}
