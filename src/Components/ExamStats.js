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
  width: 40rem;
  height:25rem;
  padding: 1rem; 
  margin: 1rem;
  background-color:white;
  border-radius: 1rem;
  box-shadow: 0 0 3rem 0.5rem hsl(0deg 0% 0% / 20%);
`

const Title= styled.p`
padding: 1rem;
font-size: 2rem;
color:black;
&::after{
    content: "";
    display: block;
    padding:0.5rem;
    border-bottom: 2px solid lightgray;
}
`
const Text=styled.p`
padding: 1rem;
&:last-child::after{
    border-bottom:none;
    padding:0;
}
&::after{
    content: "";
    display: block;
    padding:0.5rem;
    border-bottom: 2px solid lightgray;
}

& span{
    color:${props=>props.color};
}
`
