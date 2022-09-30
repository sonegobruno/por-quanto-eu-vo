import { Fab } from 'native-base';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'shared/components/SafeAreaView';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView).attrs({
  omitEdges: ['top', 'bottom'],
})`
  padding: ${Platform.OS === 'ios' ? 0 : getStatusBarHeight()}px 0;
  background: ${({ theme }) => theme.colors.neutral_100};

  flex: 1;
  position: relative;
`;

export const CreateCarButton = styled(Fab).attrs({
  placement: 'bottom-right',
  renderInPortal: false,
})``;
