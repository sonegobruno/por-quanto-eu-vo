import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Icon, Text } from 'native-base';
import * as S from './styles';

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  title: string;
  iconName: React.ComponentProps<typeof Feather>['name'];
  isSelected: boolean;
};

export function DemandButton({ title, iconName, isSelected, ...rest }: Props) {
  return (
    <S.DemandButton isSelected={isSelected} {...rest}>
      <Icon
        as={<Feather name={iconName} />}
        color={isSelected ? 'primary.300' : 'neutral.500'}
        mt="1"
        size="lg"
        alignSelf="center"
      />

      <Text
        textAlign="center"
        fontSize="md"
        mt="2"
        fontWeight={isSelected ? 'bold' : 'normal'}
        color={isSelected ? 'primary.300' : 'neutral.500'}
        lineHeight="sm"
      >
        {title}
      </Text>
    </S.DemandButton>
  );
}
