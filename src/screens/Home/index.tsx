import React from 'react';
import { useForm } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input } from 'shared/components/Form/Inputs/Input';

import * as S from './styles';

type FormValues = {
  distance: number;
};

export function Home() {
  const form = useForm<FormValues>({ reValidateMode: 'onSubmit' });

  return (
    <S.Container>
      <S.Title>
        Descubra o valor de {'\n'}
        combustível gasto com {'\n'}
        facilidade
      </S.Title>

      <Input
        label="Distância a ser percorrida (km)"
        containerStyles={{ marginTop: RFValue(40) }}
        controller={{
          name: 'distance',
          control: form.control,
        }}
      />
    </S.Container>
  );
}
