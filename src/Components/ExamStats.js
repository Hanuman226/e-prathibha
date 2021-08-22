import styled from "styled-components";

export default function ExamStats() {
  return( <Wrapper>
<Title >My Exam Stats</Title>
<Text color="green">Total Exam Given : <span>6</span></Text>
<Text color="green">Best Score in : <span>practice_session_1</span></Text>
<Text color="blue">On : <span>06-08-2021 9:58 AM</span></Text>
<Text color="blue">Average Percent : <span>22%</span></Text>
  </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  font-weight: bold;
  align-self:flex-start;
  padding: 0.625rem; 
  border-radius: 0.625rem;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
`

const Title= styled.p`
text-transform: uppercase;
&::after{
    content: "";
    display: block;
    padding:0.3125rem;
    border-bottom: 1.2px solid lightgray;
}
`
const Text=styled.p`
&:last-child::after{
    border-bottom:none;
    padding:0;
}
&::after{
    content: "";
    display: block;
    border-bottom: 1.2px solid lightgray;
}

& span{
    color:${props=>props.color};
}
`
