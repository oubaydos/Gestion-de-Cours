import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }
    body {
        background-color: #f5f5f5;
        font-family: 'Lato';
        font-size: 5vh;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default GlobalStyle;