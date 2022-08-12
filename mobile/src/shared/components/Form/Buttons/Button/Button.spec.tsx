/* eslint-disable react/jsx-no-bind */
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import React, { useState } from 'react';
import { FakeNativeBaseProvider } from 'test/FakeNativeBaseProvider';
import nativeTheme from 'styles/native-base-theme';
import { Button } from '.';

jest.useFakeTimers();

const Providers: React.FC = ({ children }) => (
  <FakeNativeBaseProvider>{children}</FakeNativeBaseProvider>
);

const TestComponent: React.FC<any> = ({ onPress, type }) => {
  return (
    <Providers>
      <Button title="test" type={type} onPress={onPress} />
    </Providers>
  );
};

const WithLoadingComponent: React.FC<any> = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);

  function onPress() {
    act(() => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    });
  }
  return (
    <Providers>
      <Button
        title="test"
        type={type}
        isLoading={isLoading}
        onPress={onPress}
      />
    </Providers>
  );
};

describe('Button Component', () => {
  let renderApi: RenderAPI;
  const mockFn = jest.fn();

  describe('Primary Type', () => {
    beforeEach(() => {
      renderApi = render(<TestComponent onPress={mockFn} type="primary" />, {
        wrapper: Providers,
      });
    });

    it('should render', () => {
      const textButton = renderApi.getByText('test');

      expect(textButton).toBeTruthy();
    });

    it('should have primary style', () => {
      const nativeButton = renderApi.getByTestId('NativeButton');
      const textButton = renderApi.getByText('test');

      const textStyle = textButton.props.style;
      const buttonStyle = nativeButton.props.style;

      expect(textStyle.color).toBe(nativeTheme.colors.neutral['100']);
      expect(textStyle.fontWeight).toBe('700');
      expect(buttonStyle.backgroundColor).toBe(
        nativeTheme.colors.primary['600'],
      );
    });

    it('should dispatch on press event', () => {
      const nativeButton = renderApi.getByTestId('NativeButton');

      fireEvent.press(nativeButton);

      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('Secondary Type', () => {
    beforeEach(() => {
      renderApi = render(<TestComponent onPress={mockFn} type="secondary" />, {
        wrapper: Providers,
      });
    });

    it('should render', () => {
      const textButton = renderApi.getByText('test');

      expect(textButton).toBeTruthy();
    });

    it('should have secondary style', () => {
      const nativeButton = renderApi.getByTestId('NativeButton');
      const textButton = renderApi.getByText('test');

      const textStyle = textButton.props.style;
      const buttonStyle = nativeButton.props.style;

      expect(textStyle.color).toBe(nativeTheme.colors.primary['600']);
      expect(textStyle.fontWeight).toBe('700');
      expect(buttonStyle.borderColor).toBe(nativeTheme.colors.primary['600']);
    });

    it('should dispatch on press event', () => {
      const nativeButton = renderApi.getByTestId('NativeButton');

      fireEvent.press(nativeButton);

      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('Link Type', () => {
    beforeEach(() => {
      renderApi = render(<TestComponent onPress={mockFn} type="link" />, {
        wrapper: Providers,
      });
    });

    it('should render', () => {
      const textButton = renderApi.getByText('test');

      expect(textButton).toBeTruthy();
    });

    it('should have secondary style', () => {
      const nativeButton = renderApi.getByTestId('NativeButton');
      const textButton = renderApi.getByText('test');

      const textStyle = textButton.props.style;
      const buttonStyle = nativeButton.props.style;

      expect(textStyle.color).toBe(nativeTheme.colors.primary['600']);
      expect(textStyle.fontWeight).toBe('700');
      expect(buttonStyle.borderColor).toBeFalsy();
      expect(buttonStyle.backgroundColor).toBeFalsy();
    });

    it('should dispatch on press event', () => {
      const nativeButton = renderApi.getByTestId('NativeButton');

      fireEvent.press(nativeButton);

      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('With Loading', () => {
    const testLoading = async (type: string) => {
      renderApi = render(<WithLoadingComponent type={type} />, {
        wrapper: Providers,
      });

      const nativeButton = renderApi.getByTestId('NativeButton');

      expect(renderApi.getByText('test')).toBeTruthy();

      fireEvent.press(nativeButton);

      expect(renderApi.getByTestId('Spinner Loading')).toBeTruthy();

      await waitFor(() => expect(renderApi.getByText('test')).toBeTruthy(), {
        interval: 100,
      });
    };

    it('should render loading on primary button', async () => {
      await testLoading('primary');
    });

    it('should render loading on secondary button', async () => {
      await testLoading('secondary');
    });

    it('should render loading on link button', async () => {
      await testLoading('link');
    });
  });
});
