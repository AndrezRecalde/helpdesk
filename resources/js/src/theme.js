import cx from 'clsx';
import {
  Container,
  DEFAULT_THEME,
  TextInput,
  Textarea,
  Select,
  PasswordInput,
  NumberInput,
  createTheme,
  mergeMantineTheme,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import classes from "./assets/styles/modules/Container.module.css";

const inputMobileFontFix = {
  '@media (max-width: 768px)': {
    fontSize: '16px',
  },
};

export const themeOrverride = createTheme({
  fontFamily: 'Poppins, Greycliff CF, sans-serif',
  headings: { fontFamily: 'Poppins, Greycliff CF, sans-serif' },
  primaryColor: 'teal',

  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),

    TextInput: TextInput.extend(() => ({
      styles: { input: inputMobileFontFix },
    })),

    Textarea: Textarea.extend(() => ({
      styles: { input: inputMobileFontFix },
    })),

    Select: Select.extend(() => ({
      styles: { input: inputMobileFontFix },
    })),

    PasswordInput: PasswordInput.extend(() => ({
      styles: { input: inputMobileFontFix },
    })),

    NumberInput: NumberInput.extend(() => ({
      styles: { input: inputMobileFontFix },
    })),

    TimeInput: TimeInput.extend(() => ({
      styles: { input: inputMobileFontFix },
    })),

    DateInput: DateInput.extend(() => ({
      styles: { input: inputMobileFontFix },
    })),
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOrverride);
