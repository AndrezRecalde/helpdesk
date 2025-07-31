import cx from 'clsx';
import {
  Container,
  DEFAULT_THEME,
  createTheme,
  mergeMantineTheme,
} from '@mantine/core';
import classes from "./assets/styles/modules/Container.module.css";

export const themeOrverride = createTheme({
  fontFamily: 'Poppins, Greycliff CF, sans-serif',
  headings: { fontFamily: 'Poppins, Greycliff CF, sans-serif' },
  primaryColor: 'teal',
  primaryShade: 8,

  globalStyles: () => ({
    '@media (max-width: 768px)': {
      'input, textarea, select': {
        fontSize: '16px !important',
      },
    },
  }),

  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOrverride);
