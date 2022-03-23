import React from 'react';
import { DemandButton } from './DemandButton';

import * as S from './styles';

type DemandOptionsProps = 'Somente ida' | 'Bate e volta';

type Props = {
  onChangeDemandSelected: (demandSelected: DemandOptionsProps) => void;
  demandSelected: DemandOptionsProps | '';
};

export function DemandWrapper({
  demandSelected,
  onChangeDemandSelected,
}: Props) {
  return (
    <>
      <S.Demand>Cobrar:</S.Demand>

      <S.DemandButtonContainer>
        <DemandButton
          title={`Somente ${'\n'}ida`}
          iconName="corner-up-right"
          isSelected={demandSelected === 'Somente ida'}
          onPress={() => onChangeDemandSelected('Somente ida')}
        />
        <S.GoButton
          title={`bate e ${'\n'}volta`}
          iconName="repeat"
          isSelected={demandSelected === 'Bate e volta'}
          onPress={() => onChangeDemandSelected('Bate e volta')}
        />
      </S.DemandButtonContainer>
    </>
  );
}
