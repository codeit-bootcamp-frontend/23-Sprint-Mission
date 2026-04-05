import ReactDOM from 'react-dom/client'
import App from './App.js'
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/Theme.js';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
