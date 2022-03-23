import { SafeAreaView } from 'shared/components/SafeAreaView';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView).attrs({
  omitEdges: ['top', 'bottom'],
})`
  flex: 1;
`;
