import { Fab } from 'native-base';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'shared/components/SafeAreaView';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView).attrs({
  omitEdges: ['top', 'bottom'],
})`
  padding: ${Platform.OS === 'ios' ? 0 : getStatusBarHeight()}px
    ${RFValue(24)}px 0 ${RFValue(24)}px;
  background: ${({ theme }) => theme.colors.neutral_100};

  flex: 1;
  position: relative;
`;

export const CreateCarButton = styled(Fab).attrs({
  placement: 'bottom-right',
  renderInPortal: false,
})``;
