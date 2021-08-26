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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    fonmt-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: "Zilla Slab";
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
    font-weight: 400;
  }
`;
