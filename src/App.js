// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ExamRules from "./screens/ExamScreen/ExamRules";
import ExamScreen from "./screens/ExamScreen/ExamScreen";
import { ErrorBoundary } from "./ErrorBoundary";
import GlobalStyle from "./globalStyles";
import FreeExamsList from "./screens/ExamScreen/FreeExamsList";
import PremiumExamsList from "./screens/ExamScreen/PremiumExamsList";
import ExamFeedbackForm from "./screens/ExamScreen/ExamFeedbackForm";
import ExamResult from "./screens/ExamScreen/ExamResult";
import AllBookmarkScreen from "./screens/AllBookmarkScreen/AllBookmarkScreen";
import InCorrectQuesScreen from "./screens/InCorrectQuesScreen/InCorrectQuesScreen";
import SummaryScreen from "./screens/SummaryScreen/SummaryScreen";
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Sidebar />
      <Container>
        <Header />
        <MainContent>
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route
                exact
                path="/free_previous_papers"
                component={FreeExamsList}
              />
              <Route
                exact
                path="/:package/instruction/:examname/:examid"
                component={ExamRules}
              />
              <Route
                exact
                path="/start_exam/:examname/:examid"
                component={ExamScreen}
              />
              <Route
                exact
                path="/premium_previous_papers"
                component={PremiumExamsList}
              />
              <Route exact path="/form" component={ExamFeedbackForm} />
              <Route exact path="/exam_result" component={ExamResult} />
              <Route
                exact
                path="/all_bookmarks"
                component={AllBookmarkScreen}
              />
              <Route
                exact
                path="/incorrect_questions"
                component={InCorrectQuesScreen}
              />
              <Route exact path="/summary" component={SummaryScreen} />

              <Route path="*" render={() => <h1>Under Construction</h1>} />
            </Switch>
          </ErrorBoundary>
        </MainContent>
        <Footer />
      </Container>
    </Router>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-areas: ". nav" ". main-content" ". footer";
  grid-template-columns: 2.5rem 1fr;
  grid-template-rows: 3.75rem auto 3.125rem;
  height: 100%;
  /* overflow-x: hidden; */
`;

const MainContent = styled.main`
  grid-area: main-content;
  /* background-color: lightgray; */
  padding: 2vw;
  /* overflow-x: hidden; */
`;

export default App;
