import "./App.css";
import styled from "styled-components";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
function App() {
  return (
    <>
   <Sidebar/>
    <Container>
   <Header/>
   <Footer/>
   </Container>
   </>
  );
}

const Container =styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
height:100%;
margin-left:4rem;
`

export default App;
