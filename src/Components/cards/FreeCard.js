import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled,{keyframes} from "styled-components";
import icon1 from "../../Icons/1.png"
export default function Card({progress}) {
  return (
    <Wrapper>
        <Label>
            <FontAwesomeIcon icon={['fas','star']}/>
            <span>free</span>
            </Label>
      <CardIcon>
      <img src={icon1} alt=""/>
      </CardIcon>
      <Description>
        <h3>Explore for free</h3>
        <ul>
          <li>3 Years Old Question Paper Civil services (Prelims)</li>
          <li>Limited UPSC Old Question Papers ( CDS, Geo Scientists(Pre), CISF, CAPF, NDA, Engineering Services (Pre) and SO)</li>
          <li>Limited questions from Basics of School NCERT ( 6th to 10th Class)</li>
        </ul>
      </Description>
      <ProgressBar color={"red"} fill={progress} />
      <Footer><a href="/">start now</a></Footer>
    </Wrapper>
  );
}


const move =keyframes`
 from{
    background-position: 0 0;
  }
  to {
    background-position: 50px 50px;
  }
`
const Wrapper = styled.div`
  position: relative;
  width: 40rem;
  padding: 3.5rem 1rem 1rem 1rem; 
  margin: 1rem;
  display: grid;
  grid-template-areas: "icon desc" "bar bar " "footer footer";
  grid-template-columns: 8.5rem 1fr;
  grid-template-rows: 1fr 3rem 4rem;
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
const ProgressBar = styled.div`
  grid-area: bar;
  height: 1.2rem;
  width: 100%;
  background-color: #0a0c0f;
  position: relative;
  border-radius: 1rem;
  &::after {
    content: attr(fill) "%";
    color: white;
    text-align: center;
    font-size: 1.2rem;
    border-radius: 1rem;
    display: block;
    background-color: ${(props) => props.color};
    width: ${(props) => props.fill + "%"};
    height: 1.2rem;
    position: absolute;

    background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.4) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.4) 75%,
    transparent 75%,
    transparent
  );
  background-size: 50px 50px;
  animation: ${move} 2s linear infinite;
  }
`;
const Footer = styled.div`
grid-area: footer;
display: flex;
width:100%;
justify-content:flex-end;

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


const Label=styled.div`
position: absolute;
background-color:lightgray;
display: flex;
justify-content: center;
align-items: center;
padding:1rem 3rem;
height: 3rem;
top:0;
right:1rem;
border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;

    & svg{
        font-size:1.4rem;
    }
& span{
    padding-left:0.8rem;
    color:black;
    text-transform: uppercase;
}

`