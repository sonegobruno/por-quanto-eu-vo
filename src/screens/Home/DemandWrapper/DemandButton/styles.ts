import { Icon, Text as ElementText } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { DefaultTheme } from 'styled-components/native';

type DemandButtonProps = {
  theme: DefaultTheme;
  isSelected: boolean;
};

export const DemandButton = styled.TouchableOpacity<DemandButtonProps>`
  width: 100%;
  max-width: ${RFValue(104)}px;
  height: ${RFValue(88)}px;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.neutral_500};

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : 'transparent'};

  border-width: 1px;
  border-radius: 6px;
  padding: 8px;
`;

export const DemandButtonIcon = styled(Icon).attrs(
  ({ theme, isSelected }: DemandButtonProps) => ({
    color: isSelected ? theme.colors.neutral_100 : theme.colors.neutral_500,
    type: 'feather',
  }),
)<DemandButtonProps>`
  margin-top: ${RFValue(2)}px;
`;

export const DemandButtonText = styled(ElementText)<DemandButtonProps>`
  text-align: center;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.neutral_100 : theme.colors.neutral_500};

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme, isSelected }) =>
    isSelected ? theme.fonts.roboto_bold : theme.fonts.roboto_regular};
  margin-top: ${RFValue(8)}px;
`;
