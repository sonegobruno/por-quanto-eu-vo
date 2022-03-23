import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputMask } from 'shared/components/Form/Inputs/InputMask';
import { formatMoneyToNumber } from 'shared/utils/formatData';
import { AVERAGE_FUEL_CONSUMPTION } from 'shared/contants/averageFuelConsumption';
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

  const [demandSelected, setDemandSelected] = useState<DemandOptionsProps | ''>(
    '',
  );

  const handleSumValues = useCallback(
    ({ distance, gasAmount }: FormValues) => {
      if (demandSelected === '') return;

      const formattedGasAmount = formatMoneyToNumber(gasAmount);

      const spentGasLitens = Number(distance) / AVERAGE_FUEL_CONSUMPTION;

      const spentAmount =
        spentGasLitens * formattedGasAmount * DEMAND_OPTIONS[demandSelected];

      console.log(spentAmount.toFixed(2));
    },
    [demandSelected],
  );

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
          name: 'gasAmount',
          control: form.control,
        }}
        type="money"
      />

      <DemandWrapper
        demandSelected={demandSelected}
        onChangeDemandSelected={setDemandSelected}
      />

      <S.SumButton
        title="Somar valores"
        onPress={form.handleSubmit(handleSumValues)}
      />
    </S.Container>
  );
}
