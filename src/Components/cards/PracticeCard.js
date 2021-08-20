import React from "react";
import styled from "styled-components";
import icon3 from "../../Icons/3.png"
export default function Card(props) {
  return (
    <Wrapper>
      <CardIcon>
       <img src={icon3} alt=""/>
      </CardIcon>
      <Description>
        <h3>Practice Session</h3>
        <ul>
           <li>Category wise exams (NCERT, UPSC, Other UPSC).</li>
           <li>Attempt subject wise exams.</li>
           <li>Can attempt only 20 question per exam.</li>
        </ul>
      </Description>
      <Footer><a href="/">start now</a></Footer>
    </Wrapper>
  );
}



const Wrapper = styled.div`
  position: relative;
  width: 40rem;
  padding: 3.5rem 1rem 1rem 1rem; 
  margin: 1rem;
  display: grid;
  grid-template-areas: "icon desc" "footer footer";
  grid-template-columns: 8.5rem 1fr;
  grid-template-rows: 1fr 4rem;
  background-color:white;
  border-radius: 1rem;
  box-shadow: 0 0 3rem 0.5rem hsl(0deg 0% 0% / 20%);
`;

const CardIcon = styled.div`
  grid-area: icon;
  height: 8rem;
  width: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:1rem;
  background: hsl(222deg 100% 89%);
`;
const Description = styled.div`
  grid-area: desc;
  & h3 {
    text-decoration: underline;
    padding-bottom: 1rem;
    text-transform: uppercase;
  }
  & ul {
    list-style: upper-alpha;
  }

  & li {
    margin-left: 5rem;
    padding-bottom: 1rem;
    font-size: 1.4rem;
  }
`;

const Footer = styled.div`
grid-area: footer;
display: flex;
width:100%;
justify-content: flex-end;
align-items:center;

& a{
    text-decoration:none;
  height: 4rem;
  width: 10rem;
  border-radius: 1rem;
  border: none;
  text-transform: uppercase;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  user-select: none;
  background-color: black;
  color: white;
  cursor: pointer;
  box-shadow: 0 0 0.5rem 0.2rem hsl(0deg 0% 0% / 40%);
}

& a:active{
    box-shadow: none;
}
`;

