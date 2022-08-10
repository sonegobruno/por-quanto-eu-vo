import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { FakeNativeBaseProvider } from 'test/FakeNativeBaseProvider';
import nativeTheme from 'styles/native-base-theme';
import { Button } from '.';

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
});
