import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputMask } from 'shared/components/Form/Inputs/InputMask';
import { formatMoneyToNumber } from 'shared/utils/formatData';
import { AVERAGE_FUEL_CONSUMPTION } from 'shared/contants/averageFuelConsumption';
import * as S from './styles';

type FormValues = {
  distance: string;
  gasValue: string;
};

const FormSchema = yup.object().shape({
  distance: yup.string().required('Distância obrigatória'),
  gasValue: yup.string().required('Valor do combustível obrigatório'),
});

export function Home() {
  const form = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });

  const handleSumValues = useCallback(({ distance, gasValue }: FormValues) => {
    const formattedGasValue = formatMoneyToNumber(gasValue);

    const spentGasLitens = Number(distance) / AVERAGE_FUEL_CONSUMPTION;

    const spentValue = spentGasLitens * formattedGasValue;

    console.log(spentValue.toFixed(2));
  }, []);

  return (
    <S.Container>
      <S.Title>
        Descubra o valor de {'\n'}
        combustível gasto com {'\n'}
        facilidade
      </S.Title>

      <S.DistanceInput
        label="Distância a ser percorrida (km)"
        placeholder="Digite a distância"
        controller={{
          name: 'distance',
          control: form.control,
        }}
        keyboardType="phone-pad"
      />

      <InputMask
        label="Qual o valor do combustível?"
        placeholder="R$ 00,00"
        controller={{
          name: 'gasValue',
          control: form.control,
        }}
        type="money"
      />

      <S.SumButton
        title="Somar valores"
        onPress={form.handleSubmit(handleSumValues)}
      />
    </S.Container>
  );
}
