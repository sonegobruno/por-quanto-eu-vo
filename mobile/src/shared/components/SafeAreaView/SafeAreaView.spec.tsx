import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaView } from '.';

describe('SafeAreaView', () => {
  it('should render Safe Area View correctly ', () => {
    const { getByTestId } = render(<SafeAreaView />);

    const safeAreaView = getByTestId('safe-area-view');

    expect(safeAreaView).toBeTruthy();
  });

  it('should render Safe Area View with edges', () => {
    const { getByTestId } = render(<SafeAreaView />);

    const safeAreaView = getByTestId('safe-area-view');

    expect(safeAreaView.props.edges).toHaveLength(4);
  });

  it('should render Safe Area View without top edges', () => {
    const { getByTestId } = render(<SafeAreaView omitEdges={['top']} />);

    const safeAreaView = getByTestId('safe-area-view');

    expect(safeAreaView.props.edges).toHaveLength(3);
  });
});
