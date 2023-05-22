import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      200: '#66BD50',
      300: '#5BBA52',
      400: '#63BC51',
      500: '#02A066',
      600: '#019F66',
      700: '#61BC51',
      800: '#02A067',
      900: '#FFFFFF',
    },
    secondary: {
      200: '#C2D93A',
      300: '#C1D83A',
      400: '#B5D53E',
      500: '#A5D83A',
      600: '#A1D042',
    },
    lightGray: {
      400: '#D1D1D1',
    },
    textGray: {
      300: '#C4C4C4',
      400: '#848484',
    },
    customDark: {
      100: '#242424',
      200: '#181818',
      300: '#242424',
    },
    darkBg: {
      400: '#242424',
      500: '#181818',
      600: '#171717',
    },
  },
  fontConfig: {},
  fonts: {},
  letterSpacings: {
    '3xl': '016.em',
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});

export default theme;
