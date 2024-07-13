import cx from 'clsx';
import { Container, DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';
import classes from "./assets/styles/modules/Container.module.css";

export const themeOrverride = createTheme({
  /* Put your mantine theme override here */
  //fontFamilyMonospace: 'Monaco, Courier, monospace',
  fontFamily: 'Greycliff CF, sans-serif',
  headings: { fontFamily: 'Greycliff CF, sans-serif' },
  primaryColor: 'teal',
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOrverride);
