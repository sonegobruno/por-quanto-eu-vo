import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

import { SafeAreaView } from 'shared/components/SafeAreaView';
import { PrimaryButton } from 'shared/components/Form/Buttons/PrimaryButton';

export const Container = styled(SafeAreaView).attrs({
  omitEdges: ['top', 'bottom'],
})`
  padding: ${Platform.OS === 'ios' ? 0 : getStatusBarHeight()}px
    ${RFValue(24)}px 0 ${RFValue(24)}px;

  flex: 1;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral_500};
  font-size: ${RFValue(24)}px;
  line-height: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_bold};
  text-align: center;

  margin-top: ${RFValue(40)}px;
`;

export const Amount = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_bold};
  text-align: center;

  margin-top: ${RFValue(32)}px;
`;

export const BackPageText = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral_500};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_bold};
  text-align: center;

  margin-top: ${RFValue(56)}px;
`;

export const BackButton = styled(PrimaryButton).attrs({
  containerStyle: {
    marginTop: RFValue(32),
  },
})``;
