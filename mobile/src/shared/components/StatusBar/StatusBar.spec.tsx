import React from 'react';
import { render } from '@testing-library/react-native';

import { StatusBar } from '.';

describe('StatusBar', () => {
  it('should render StatusBar correctly ', () => {
    const { getByTestId } = render(<StatusBar />);

    const statusBarContainer = getByTestId('status-bar-container');

    expect(statusBarContainer).toBeTruthy();
  });

  it('should render backgroundColor on container', () => {
    const { getByTestId } = render(<StatusBar backgroundColor="#fff" />);

    const statusBarContainer = getByTestId('status-bar-container');

    expect(statusBarContainer.props.style[0].backgroundColor).toEqual('#fff');
  });
});
