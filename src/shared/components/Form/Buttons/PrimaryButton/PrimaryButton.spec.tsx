import React from 'react';
import { render } from '@testing-library/react-native';

import { PrimaryButton } from '.';

describe('Primary Button', () => {
  it('should render Primary Button correctly ', () => {
    const { getByText } = render(<PrimaryButton title="Test" />);

    const textButton = getByText('Test');

    expect(textButton).toBeTruthy();
  });
});
