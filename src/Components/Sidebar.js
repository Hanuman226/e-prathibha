import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export default function Sidebar() {
    return (
      <Wrapper>
        <Icons>
          <FontAwesomeIcon icon= {['fas','home']}/>
          <FontAwesomeIcon icon= {['fas','shopping-cart']}/>
          <FontAwesomeIcon icon= {['fas','trophy']}/>
          <FontAwesomeIcon icon= {['fas','chart-bar']}/>
          <FontAwesomeIcon icon= {['fas','bookmark']}/>
          <FontAwesomeIcon icon= {['fas','times-circle']}/>
          <FontAwesomeIcon icon= {['fas','search']}/>
          <FontAwesomeIcon icon= {['fas','compass']}/>
          <FontAwesomeIcon icon= {['fas','credit-card']}/>
          <FontAwesomeIcon icon= {['fas','question-circle']}/>
        </Icons>
      </Wrapper>
    )
}

const Wrapper= styled.aside`
position:fixed;
top:0;
left:0;
bottom:0;
height:100%;
width:4rem;
background-color:black;
color:white;
display:flex;
align-items: center;
justify-content: center;
`

const Icons= styled.div`
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:center;
height:80%;
`