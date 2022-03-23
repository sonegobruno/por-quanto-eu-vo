import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconProps } from 'react-native-elements';

import * as S from './styles';

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  title: string;
  iconName: IconProps['name'];
  isSelected: boolean;
};

export function DemandButton({ title, iconName, isSelected, ...rest }: Props) {
  return (
    <S.DemandButton isSelected={isSelected} {...rest}>
      <S.DemandButtonIcon name={iconName} isSelected={isSelected} />
      <S.DemandButtonText isSelected={isSelected}>{title}</S.DemandButtonText>
    </S.DemandButton>
  );
}
