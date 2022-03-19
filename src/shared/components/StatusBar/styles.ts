import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

type ContainerProps = {
  backgroundColor?: string;
};

export const Container = styled.View<ContainerProps>`
  height: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
  background: ${({ backgroundColor }) => backgroundColor || '#fff'};
`;
