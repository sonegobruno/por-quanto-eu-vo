import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme as styledTheme } from 'styles/theme';

export const Container = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.neutral_700};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_regular};
`;

export const styles = {
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: styledTheme.colors.neutral_300,
    backgroundColor: styledTheme.colors.neutral_200,
    borderRadius: 6,
    height: RFValue(44),
    marginTop: RFValue(8),
    paddingHorizontal: RFValue(12),
    color: styledTheme.colors.neutral_600,
    fontSize: RFValue(16),
  },
  labelStyle: {
    color: styledTheme.colors.neutral_700,
    fontFamily: styledTheme.fonts.roboto_regular,
    fontSize: RFValue(16),
  },
  containerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
};
