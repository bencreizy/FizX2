// pages/_app.js
import '../styles/globals.css';
import { createGlobalStyle } from 'styled-components';

// Define a placeholder GlobalStyle component just in case
const GlobalStyle = createGlobalStyle`
  /* Any root overrides can go here */
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;