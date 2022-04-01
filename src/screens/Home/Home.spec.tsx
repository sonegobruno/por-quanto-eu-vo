/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { theme } from 'styles/theme';
import { Home } from '.';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: (screen: string, params: any) => {},
      };
    },
  };
});

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  return {
    KeyboardAwareScrollView: jest
      .fn()
      .mockImplementation(({ children }) => children),
  };
});

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Home', () => {
  it('should render Home correctly ', () => {
    const { getByText } = render(<Home />, {
      wrapper: Providers,
    });

    const textButton = getByText('Somar valores');

    expect(textButton).toBeTruthy();
  });
});
