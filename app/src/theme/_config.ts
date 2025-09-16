import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  gray100: '#FFFFFF',
  gray200: '#525252',
  gray400: '#9E9E9E',
  gray50: '#FFFFFF',
  gray800: '#111111',
  purple100: '#F2F2F7',
  purple50: '#F8F8FA',
  purple500: '#A6A4F0',
  red500: '#FF0000',
  skeleton: '#CFCFCF',
} as const;

const colorsDark = {
  gray100: '#000000',
  gray200: '#BABABA',
  gray400: '#969696',
  gray50: '#FFD800',
  gray800: '#00B8FF',
  purple100: '#252732',
  purple50: '#1B1A23',
  purple500: '#A6A4F0',
  red500: '#FF0000',
  skeleton: '#303030',
} as const;

const sizes = [12, 16, 24, 32, 40, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 16],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.gray50,
    card: colorsLight.gray50,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.gray100,
        card: colorsDark.gray100,
      },
    },
  },
} as const satisfies ThemeConfiguration;
