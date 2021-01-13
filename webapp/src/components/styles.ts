import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body,
  html,
  #app,
  #app > div {
    margin: 0;
    height: 100%;
  }

  body[data-theme='light'] {
    --colors-primary: deeppink;
    --colors-background: white;
  }

  body[data-theme='dark'] {
      --colors-primary: lightpink;
      --colors-background: black;
  }

  body {
    color: var(--colors-primary);
    background-color: var(--colors-background);
  }

  * {
    font-family: "Helvetica Neue", Helvetica;
  }

  h1, h2, h3, h4, h5, h6 {
   margin: 0;
  }
`;
