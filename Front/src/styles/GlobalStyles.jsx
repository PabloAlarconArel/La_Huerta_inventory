import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body{
        margin:0;
        padding:0;
        box-sizing:border-box;
        background-color: ${({theme}) => theme.bgtotal};
        fontfamily: "Poppins", sans-serif;  
        color: #ffff;

    }
    
`
