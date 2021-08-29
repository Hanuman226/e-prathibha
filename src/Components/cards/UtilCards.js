import React from "react";
import styled from "styled-components";

export default function Card(props) {
  const { title, desc, icon } = props.data;
  return (
    <Wrapper>
      <CardIcon>
        <img src={icon} alt="" />
      </CardIcon>
      <Description>
        <h4>{title}</h4>
        <p>{desc}</p>
      </Description>
      <Footer>
        <button>view now</button>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.1875rem 0.625rem 0.625rem 0.625rem;
  display: grid;
  grid-template-areas: "icon desc" ". ." "footer footer";
  grid-template-columns: 5.3125rem 1fr;
  grid-template-rows: 1fr 1.875rem 2.5rem;
  border-radius: 0.625rem;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
`;

const CardIcon = styled.div`
  grid-area: icon;
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: hsl(222deg 100% 89%);
`;
const Description = styled.div`
  grid-area: desc;
  & h4 {
    text-decoration: underline;
    text-transform: uppercase;
  }
`;

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  & button {
    height: 2.5rem;
    width: 6.25rem;
    border-radius: 0.625rem;
    border: none;
    text-transform: uppercase;
    padding: 0.625rem;
    font-size: 0.75rem;
    font-weight: bold;
    background-color: black;
    color: white;
    cursor: pointer;
    box-shadow: 0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%);
    outline: none;
  }

  & button:active {
    box-shadow: none;
  }
`;
