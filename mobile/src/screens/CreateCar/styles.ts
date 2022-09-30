import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'shared/components/SafeAreaView';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView).attrs({
  omitEdges: ['top', 'bottom'],
})`
  padding: ${Platform.OS === 'ios' ? 0 : getStatusBarHeight()}px 0 0;
  background: ${({ theme }) => theme.colors.neutral_100};

  flex: 1;
`;

export const Content = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: { padding: RFValue(15), paddingTop: RFValue(8) },
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
}))`
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral_100};
`;
