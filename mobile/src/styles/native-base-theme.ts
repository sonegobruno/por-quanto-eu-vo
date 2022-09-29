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
    }, // 185 96 90 | 186 94 82 | 187 92 69 | 188 86 53 | 189 94 43 | 192 91 36 | 193 82 31 | 194 70 27
    secondary: {
      '100': '#FFD8CC',
      '200': '#FFB7A3',
      '300': '#FE8E6D',
      '400': '#F65622',
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
