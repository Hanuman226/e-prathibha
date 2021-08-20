import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Container>
          <Header />
          <MainContent>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="*" render={()=><h1>Under Construction</h1>} />
            </Switch>
          </MainContent>
          <Footer />
        </Container>
      </Router>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-areas: ". nav" ". main-content" ". footer";
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 6rem auto 5rem;
  height: 100%;
`;

const MainContent = styled.main`
  grid-area: main-content;
  background-color: lightgray;
`;

export default App;
