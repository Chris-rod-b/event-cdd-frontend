import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: 'poppins', sans-serif;
    }

    body {
        width: 100vw;
        height: 100vh;
        background-color: #f2f2f2;
    }
`;

export default Global;