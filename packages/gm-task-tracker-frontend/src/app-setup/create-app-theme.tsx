import React from 'react';
import {
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from '@material-ui/core/styles';

const themeOptions: ThemeOptions = {};

export function createAppTheme(): Theme {
  return createTheme(themeOptions);
}

export function wrapWithTheme(
  component: React.ReactElement,
  theme: Theme
): React.ReactElement {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}
