import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { DemandButton } from './DemandButton';

export const DemandButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${RFValue(16)}px;
`;

export const GoButton = styled(DemandButton)`
  margin-left: ${RFValue(16)}px;
`;
