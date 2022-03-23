import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Text as ElementText } from 'react-native-elements';
import { DemandButton } from './DemandButton';

export const Demand = styled(ElementText)`
  color: ${({ theme }) => theme.colors.neutral_700};
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_bold};
  text-align: center;
  margin-top: ${RFValue(24)}px;
`;

export const DemandButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${RFValue(16)}px;
`;

export const GoButton = styled(DemandButton)`
  margin-left: ${RFValue(16)}px;
`;
