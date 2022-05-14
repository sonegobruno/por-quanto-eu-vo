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

export const stateStyle = {
  focus: {
    borderWidth: 2,
    borderColor: styledTheme.colors.primary_tint,
  },
  filled: {
    borderWidth: 1,
    borderColor: styledTheme.colors.primary_tint,
  },
  normal: {
    borderWidth: 1,
    borderColor: styledTheme.colors.neutral_300,
  },
  error: {
    borderWidth: 2,
    borderColor: styledTheme.colors.error,
  },
};

export const styles = {
  inputContainerStyle: {
    backgroundColor: styledTheme.colors.neutral_200,
    borderRadius: 6,
    height: RFValue(44),
    marginTop: RFValue(8),
    paddingHorizontal: RFValue(12),
  },
  inputStyle: {
    color: styledTheme.colors.neutral_700,
    fontSize: RFValue(16),
  },
  labelStyle: {
    color: styledTheme.colors.neutral_600,
    fontFamily: styledTheme.fonts.roboto_regular,
    fontSize: RFValue(16),
  },
  containerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  errorStyle: {
    color: styledTheme.colors.error,
    fontFamily: styledTheme.fonts.roboto_regular,
    fontSize: RFValue(14),
  },
};
