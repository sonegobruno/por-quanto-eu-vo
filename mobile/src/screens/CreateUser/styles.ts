import { Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'shared/components/SafeAreaView';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PrimaryButton } from 'shared/components/Form/Buttons/PrimaryButton';

export const Container = styled(SafeAreaView).attrs({
  omitEdges: ['top', 'bottom'],
})`
  padding: ${Platform.OS === 'ios' ? 0 : getStatusBarHeight()}px 0 0;
  background: ${({ theme }) => theme.colors.neutral_100};

  flex: 1;
`;

export const Content = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: { padding: RFValue(40), paddingTop: RFValue(48) },
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
}))`
  width: 100%;
  height: ${RFValue(456)}px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.neutral_100};
  z-index: 1;
  border-top-left-radius: ${RFValue(50)}px;
  border-top-right-radius: ${RFValue(50)}px;
`;

export const LogoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.View`
  width: ${RFValue(566)}px;
  height: ${RFValue(566)}px;
  border-radius: ${RFValue(400)}px;
  background: ${({ theme }) => theme.colors.primary_tint};

  position: absolute;
  top: 22%;
  right: -25%;
`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral_700};
  font-size: ${RFValue(28)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_bold};
  margin-bottom: ${RFValue(32)}px;
`;

export const CreateButton = styled(PrimaryButton).attrs({
  containerStyle: {
    marginTop: RFValue(16),
  },
})``;
