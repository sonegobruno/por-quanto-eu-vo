import { Heading, Text } from 'native-base';
import React from 'react';
import { DemandButton } from './DemandButton';

import * as S from './styles';

type DemandOptionsProps = 'Somente ida' | 'Bate e volta';

type Props = {
  onChangeDemandSelected: (demandSelected: DemandOptionsProps) => void;
  demandSelected: DemandOptionsProps | '';
  showError: boolean;
};

export function DemandWrapper({
  demandSelected,
  onChangeDemandSelected,
  showError,
}: Props) {
  return (
    <>
      <Heading color="neutral.700" fontSize="2xl" textAlign="center" mt="4">
        Cobrar:
      </Heading>

      <S.DemandButtonContainer>
        <DemandButton
          title={`Somente ${'\n'}ida`}
          iconName="corner-up-right"
          isSelected={demandSelected === 'Somente ida'}
          onPress={() => onChangeDemandSelected('Somente ida')}
          testID="demand-button-just-go"
        />
        <S.GoButton
          title={`bate e ${'\n'}volta`}
          iconName="repeat"
          isSelected={demandSelected === 'Bate e volta'}
          onPress={() => onChangeDemandSelected('Bate e volta')}
          testID="demand-button-go-back"
        />
      </S.DemandButtonContainer>

      {showError && (
        <Text
          color="error.500"
          fontSize="sm"
          textAlign="center"
          mt="4"
          fontWeight="bold"
        >
          opsss, você esqueceu de selecionar uma cobrança
        </Text>
      )}
    </>
  );
}
