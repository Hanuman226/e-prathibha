import styled from "styled-components"
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const date=new Date();
  console.log(date);
  return (
    <Wrapper>
          <p>Copyright &copy; {currentYear}</p>
          <p>Date and Time</p>
          <p>Powered by: Error Technologies</p>
    </Wrapper>
  );
}


const Wrapper = styled.footer`
grid-area: footer;
display:flex;
justify-content:space-between;
align-items:center;
background:black;
color:white;
padding:1rem;
`
