// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-empty-function */
// import React from 'react';
// import { fireEvent, render } from '@testing-library/react-native';
// import { ThemeProvider } from 'styled-components/native';

// import { theme } from 'styles/theme';
// import { Home } from '.';

// jest.mock('@react-navigation/native', () => {
//   return {
//     useNavigation: () => {
//       return {
//         navigate: (screen: string, params: any) => {},
//       };
//     },
//   };
// });

// jest.mock('react-native-keyboard-aware-scroll-view', () => {
//   return {
//     KeyboardAwareScrollView: jest
//       .fn()
//       .mockImplementation(({ children }) => children),
//   };
// });

// const Providers: React.FC = ({ children }) => (
//   <ThemeProvider theme={theme}>{children}</ThemeProvider>
// );

// describe('Home', () => {
//   it('should render Home correctly ', () => {
//     const { getByText } = render(<Home />, {
//       wrapper: Providers,
//     });

//     const textButton = getByText('Somar valores');

//     expect(textButton).toBeTruthy();
//   });

//   it('should show error when i not selected a demand', () => {
//     const { getByText, getByTestId } = render(<Home />, {
//       wrapper: Providers,
//     });

//     const textError = getByText(
//       'opsss, você esqueceu de selecionar uma cobrança',
//     );

//     const submitButton = getByTestId('sum-values-button');

//     fireEvent.press(submitButton, { distance: '8', gasAmount: '8' });

//     expect(textError).toBeTruthy();
//   });
// });
