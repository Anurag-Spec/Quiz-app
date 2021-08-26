import styled, { createGlobalStyle } from "styled-components";
import BGimage from "./Images/chris-liverani.jpg";

export const GlobalStyle = createGlobalStyle`
html{
 height: 100%;
}
body{
 background-image: url(${BGimage});
 background-size: cover;
 margin: 0;
 padding: 0 20px;
 display: flex;
 justify-content: center;
}
*{
 box-sixing: border-box;
 font-family: 'IBM Plex Sans Thai', sans-serif;
}`;
