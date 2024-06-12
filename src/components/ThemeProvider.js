// ThemeProvider.js
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme);
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
