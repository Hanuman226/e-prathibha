import { Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";

export default function ExamScreen() {
    return (
     <Wrapper>
         <LeftPanel>
            <Header><Text>Question No.6</Text>
            <div>
            <Text color="green">Right Mark: <span>2.00</span></Text>
            <Text color="red">Negative Mark: <span>0.66</span></Text>
            </div>
            </Header>
            <Body>
                <p className="text-dark">The Narasimhan Committee for Financial sector Reforms has suggested reduction in?</p>
                <hr/>
                <fieldset>
    <Form.Group as={Row} className="mb-3">
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="SLR, CRR and Priority Financing"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="CRR, Priority Sector Financing and Fianancing to capital goods sector"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="SLR and CRR"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
        <Form.Check
          type="radio"
          label="SLR and FInancing to capital goods sector"
          name="formHorizontalRadios"
          id="formHorizontalRadios4"
        />
      </Col>
    </Form.Group>
  </fieldset>
            </Body>
            <Footer>footer</Footer>
         </LeftPanel>
         <RightPanel>right</RightPanel>
     </Wrapper>
    );
}


const Wrapper =styled.div`
display:grid;
grid-template-columns:1fr 20rem;
margin:0 auto;
height:100%;
width:100%;
box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
@media (max-width:991px){
    grid-template-columns:1fr 20rem;
}
`;

const Text=styled.p`
margin-bottom: 0;
padding:1rem;
font-weight: bold;
& span {
    color:${props=>props.color?props.color:"white"}
}
`

const LeftPanel= styled.div`
/* background-color: red; */
display: flex;
flex-direction: column;
height: 100%;
`
const RightPanel= styled.div`
background-color: blue;
`


const Header= styled.div`
padding:0 1rem;
display: flex;
justify-content: space-between;
align-items: center;
height: 3rem;
background-color: black;
color:white;
& div{
    display: flex;
    justify-content: space-between;
}
`
const Body= styled.div`
height: 70vh;
overflow-y:scroll;
overflow-x:hidden;
padding:1rem;
`
const Footer= styled.div`
margin-top:auto;
height: 3rem;
background-color: pink;
`
