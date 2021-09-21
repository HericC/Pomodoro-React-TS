import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font-family: sans-serif;
        line-height: 1.5;
        background-color: #41e1ba;
        transition: background-color 300ms ease-in-out;
    }

    button {
        cursor: pointer;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        background-color: #41e1ba;
        transition: background-color 300ms ease-in-out;
    }

    .working {
        background-color: #ef5d50;
    }

    .working button {
        background-color: #ef5d50;
    }
`;
