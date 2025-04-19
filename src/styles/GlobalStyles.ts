import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://ext.same-assets.com/4108832712/1411677578.woff2');
  @import url('https://ext.same-assets.com/4108832712/2730388244.woff2');
  @import url('https://ext.same-assets.com/4108832712/2465678096.woff2');

  :root {
    --primary-color: #5872FF;
    --primary-dark: #2C3B8D;
    --primary-light: #6b3493;
    --background-dark: #081D21;
    --text-color: #141414;
    --text-light: #545454;
    --white: #FFFFFF;
    --gray-light: #F5F5F5;
    --gray-border: #E2E2E2;
    --shadow-color: rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', 'Poppins', sans-serif;
  }

  html, body {
    font-size: 16px;
    color: var(--text-color);
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    line-height: 1.2;
  }

  h1 {
    font-size: 48px;

    @media (max-width: 768px) {
      font-size: 30px;
    }

    @media (max-width: 480px) {
      font-size: 25px;
    }
  }

  h2 {
    font-size: 40px;

    @media (max-width: 768px) {
      font-size: 35px;
    }

    @media (max-width: 480px) {
      font-size: 22px;
    }
  }

  h3 {
    font-size: 20px;
    font-weight: normal;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }

  p {
    line-height: 1.6;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
`;

export default GlobalStyles;
