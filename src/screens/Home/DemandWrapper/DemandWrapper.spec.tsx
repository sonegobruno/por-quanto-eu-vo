import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from 'styles/theme';

import { DemandWrapper } from '.';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('DemandWrapper', () => {
  it('should render DemandWrapper correctly ', () => {
    let demandSelected = 'Bate e volta' as any;
    const { getByText } = render(
      <DemandWrapper
        demandSelected={demandSelected}
        onChangeDemandSelected={newDemandSelected => {
          demandSelected = newDemandSelected;
        }}
        showError={false}
      />,
      {
        wrapper: Providers,
      },
    );

    const textButton = getByText('Cobrar:');

    expect(textButton).toBeTruthy();
  });

  it('should render errror correctly ', () => {
    let demandSelected = 'Bate e volta' as any;
    const { getByText } = render(
      <DemandWrapper
        demandSelected={demandSelected}
        onChangeDemandSelected={newDemandSelected => {
          demandSelected = newDemandSelected;
        }}
        showError
      />,
      {
        wrapper: Providers,
      },
    );

    const textButton = getByText(
      'opsss, você esqueceu de selecionar uma cobrança',
    );

    expect(textButton).toBeTruthy();
  });

  it("should isSelected 'bate e volta' Button", () => {
    let demandSelected = 'Bate e volta' as any;
    const { getByText } = render(
      <DemandWrapper
        demandSelected={demandSelected}
        onChangeDemandSelected={newDemandSelected => {
          demandSelected = newDemandSelected;
        }}
        showError
      />,
      {
        wrapper: Providers,
      },
    );

    const textButton = getByText('bate e volta');

    expect(textButton.props.isSelected).toEqual(true);
  });

  it("should isSelected 'Somente ida' Button", () => {
    let demandSelected = 'Somente ida' as any;
    const { getByText } = render(
      <DemandWrapper
        demandSelected={demandSelected}
        onChangeDemandSelected={newDemandSelected => {
          demandSelected = newDemandSelected;
        }}
        showError
      />,
      {
        wrapper: Providers,
      },
    );

    const textButton = getByText('Somente ida');

    expect(textButton.props.isSelected).toEqual(true);
  });

  it("should select 'somente ida' button when it was pressed", () => {
    let demandSelected = 'Bate e volta' as any;
    const mockedOnChangeSelected = jest.fn(newDemandSelected => {
      demandSelected = newDemandSelected;
    });
    const { getByTestId } = render(
      <DemandWrapper
        demandSelected={demandSelected}
        onChangeDemandSelected={mockedOnChangeSelected}
        showError
      />,
      {
        wrapper: Providers,
      },
    );

    const demandButton = getByTestId('demand-button-just-go');

    fireEvent.press(demandButton);

    expect(mockedOnChangeSelected).toBeCalledWith('Somente ida');
  });

  it("should select 'bate e volta' button when it was pressed", () => {
    let demandSelected = 'Bate e volta' as any;
    const mockedOnChangeSelected = jest.fn(newDemandSelected => {
      demandSelected = newDemandSelected;
    });
    const { getByTestId } = render(
      <DemandWrapper
        demandSelected={demandSelected}
        onChangeDemandSelected={mockedOnChangeSelected}
        showError
      />,
      {
        wrapper: Providers,
      },
    );

    const demandButton = getByTestId('demand-button-go-back');

    fireEvent.press(demandButton);

    expect(mockedOnChangeSelected).toBeCalledWith('Bate e volta');
  });
});
