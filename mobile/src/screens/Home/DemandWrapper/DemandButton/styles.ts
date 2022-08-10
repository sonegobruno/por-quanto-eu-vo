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
    isSelected ? theme.colors.primary_tint : theme.colors.neutral_500};

  border-width: ${({ isSelected }) => (isSelected ? 2 : 1)}px;
  border-radius: 6px;
  padding: 8px;
`;
