import styled from "styled-components"
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const date=new Date();
  console.log(date);
  return (
    <Wrapper fluid className="bg-dark text-white p-3">
          <p>Copyright &copy; {currentYear}</p>
          <p>Date and Time</p>
          <p>Powered by: Error Technologies</p>
    </Wrapper>
  );
}


const Wrapper = styled.footer`
margin-top:auto;
display:flex;
justify-content:space-between;
background:black;
color:white;
padding:1rem;
`
