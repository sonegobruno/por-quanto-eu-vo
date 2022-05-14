import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from 'styles/theme';

import { DemandButton } from '.';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('DemandButton', () => {
  it('should render DemandButton correctly ', () => {
    const { getByText } = render(
      <DemandButton title="Test" iconName="user" isSelected={false} />,
      {
        wrapper: Providers,
      },
    );

    const textButton = getByText('Test');

    expect(textButton).toBeTruthy();
  });

  it('should render DemandButton Selected correctly ', () => {
    const { getByTestId, getByText } = render(
      <DemandButton
        testID="button-container"
        title="Test"
        iconName="user"
        isSelected
      />,
      {
        wrapper: Providers,
      },
    );

    const textButton = getByText('Test');
    const button = getByTestId('button-container');
    const icon = getByTestId('iconIcon');

    expect(button.props.style.borderWidth).toEqual(2);
    expect(button.props.style.borderColor).toEqual(theme.colors.primary_tint);
    expect(textButton.props.style.color).toEqual(theme.colors.primary_tint);
    expect(icon.props.style[0].color).toEqual(theme.colors.primary_tint);
  });
});
