import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const themeOptions = {};

export function createAppTheme() {
  return createTheme(themeOptions);
}

export function wrapWithTheme(component, theme) {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}
