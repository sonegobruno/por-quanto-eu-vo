import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Container = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: { padding: RFValue(16), paddingTop: RFValue(56) },
  keyboardShouldPersistTaps: 'handled',
}))`
  background: ${({ theme }) => theme.colors.neutral_100};
`;
