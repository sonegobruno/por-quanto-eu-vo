/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { theme } from 'styles/theme';
import { GasPriceShow } from '.';

const mockHandleBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => {
      return {
        params: {
          amountCurrency: 83,
        },
      };
    },
    useNavigation: () => {
      return {
        goBack: mockHandleBack,
      };
    },
  };
});

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('GasPriceShow', () => {
  it('should render GasPriceShow correctly ', () => {
    const { getByText } = render(<GasPriceShow />, {
      wrapper: Providers,
    });

    const textButton = getByText('Deseja somar novos valores?');

    expect(textButton).toBeTruthy();
  });

  it('should render gas amount', () => {
    const { getByText } = render(<GasPriceShow />, {
      wrapper: Providers,
    });

    const amountText = getByText('R$83,00');

    expect(amountText).toBeTruthy();
  });

  it('should back to last page', () => {
    const { getByTestId } = render(<GasPriceShow />, {
      wrapper: Providers,
    });

    const backButton = getByTestId('gas-price-show-back-button');

    fireEvent.press(backButton);

    expect(mockHandleBack).toBeCalled();
  });
});
