import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import ExamsList from "./Components/ExamsList";
import ExamRules from "./Components/ExamRules";
import ExamScreen from "./Components/ExamScreen";
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
              <Route exact path="/free-previous-papers" component={ExamsList} />
              <Route
                exact
                path="/free-previous-papers/instruction/:examname/:examid"
                component={ExamRules}
              />
              <Route
                exact
                path="/free-previous-papers/exam/:examid"
                component={ExamScreen}
              />
              <Route path="*" render={() => <h1>Under Construction</h1>} />
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
  grid-template-columns: 2.5rem 1fr;
  grid-template-rows: 3.75rem auto 3.125rem;
  height: 100%;
`;

const MainContent = styled.main`
  grid-area: main-content;
  /* background-color: lightgray; */
  padding: 2vw;
`;

export default App;
