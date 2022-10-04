import { extendTheme } from 'native-base';

export const nativeBaseTheme = {
  colors: {
    neutral: {
      '900': '#1F2029',
      '800': '#353646',
      '700': '#575757',
      '600': '#8A8A8A',
      '500': '#A8A8B3',
      '400': '#D1D2DC',
      '300': '#E1E1E6',
      '200': '#EEEEF2',
      '100': '#F8F9F9',
    },
    primary: {
      '100': '#FCE3E9',
      '200': '#F6A7B7',
      '300': '#E9637B',
      '400': '#E9637B',
      '500': '#EB2C4C',
      '600': '#EB2C4C',
      '700': '#B0172E',
      '800': '#660A12',
      '900': '#660A12',
    },
    secondary: {
      '100': '#FFD8CC',
      '200': '#FFB7A3',
      '300': '#FE8E6D',
      '400': '#f76738',
      '500': '#F65622',
      '600': '#c5451b',
      '700': '#ac3c18',
      '800': '#943414',
      '900': '#7b2b11',
    },
    error: {
      '500': '#FF190C',
    },
    success: {
      '500': '#52c41a',
    },
    warning: {
      '500': '#faad14',
    },
    info: {
      '500': '#3AA4DB',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
};

export default extendTheme(nativeBaseTheme);
