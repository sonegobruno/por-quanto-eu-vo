import { Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: ${RFValue(8)}px ${RFValue(16)}px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_300};
  border-radius: 4px;
`;

export const LogoutButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral_500};
  font-size: ${RFValue(14)}px;
  margin-left: 8px;
`;
