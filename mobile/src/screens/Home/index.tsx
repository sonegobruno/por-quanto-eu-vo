import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { formatMoneyToNumber } from 'shared/utils/formatData';
import { AVERAGE_FUEL_CONSUMPTION } from 'shared/contants/averageFuelConsumption';

import { InputMask } from 'shared/components/Form/Inputs/InputMask';
import { StatusBar } from 'shared/components/StatusBar';
import { Button } from 'shared/components/Form/Buttons/Button';
import { Input } from 'shared/components/Form/Inputs/InputNative';
import * as S from './styles';
import { DemandWrapper } from './DemandWrapper';

type FormValues = {
  distance: string;
  gasAmount: string;
};

type DemandOptionsProps = 'Somente ida' | 'Bate e volta';

const FormSchema = yup.object().shape({
  distance: yup.string().required('Distância obrigatória'),
  gasAmount: yup.string().required('Valor do combustível obrigatório'),
});

const DEMAND_OPTIONS = {
  'Somente ida': 1,
  'Bate e volta': 2,
};

export function Home() {
  const form = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });
  const navigation = useNavigation<any>();

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
        <S.Title>
          Descubra o valor de {'\n'}
          combustível gasto com {'\n'}
          facilidade
        </S.Title>

        <Input
          label="Distância a ser percorrida (km)"
          placeholder="Digite a distância"
          controller={{
            name: 'distance',
            control: form.control,
          }}
          keyboardType="phone-pad"
          returnKeyType="next"
          containerProps={{ mt: '8' }}
          onSubmitEditing={() => form.setFocus('gasAmount')}
        />

        <InputMask
          label="Qual o valor do combustível?"
          placeholder="R$ 00,00"
          controller={{
            name: 'gasAmount',
            control: form.control,
          }}
          type="money"
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
