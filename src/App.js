import "react-toastify/dist/ReactToastify.css";
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
import PracticeSession from "./screens/ExamScreen/PracticeSession/PracticeSession";
import ExamCategory from "./screens/ExamScreen/PracticeSession/ExamCategory";
import SubjectsList from "./screens/ExamScreen/PracticeSession/SubjectsList";
import PracticeExamRules from "./screens/ExamScreen/PracticeSession/PracticeExamRules";
import MyResultScreen from "./screens/MyResultScreen/MyResultScreen";
import LoginRegisterScreen from "./screens/LoginRegisterScreen/LoginRegisterScreen";
import ResendEmail from "./screens/LoginRegisterScreen/ResendEmail";
import VerifyEmail from "./screens/LoginRegisterScreen/VerifyEmail";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./Layouts/AuthLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import ResetPassword from "./screens/LoginRegisterScreen/ResetPassword";
import ForgotPassword from "./screens/LoginRegisterScreen/ForgotPassword";
import ViewResult from "./screens/MyResultScreen/ViewResult";
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path={[
            "/user/verify_email",
            "/user/resend_email_verification_code",
            "/user/forgot_password",
            "/user/reset_password",
            "/user/:action",
          ]}
        >
          <AuthLayout>
            <Switch>
              <Route
                exact
                path="/user/resend_email_verification_code"
                component={ResendEmail}
              />
              <Route exact path="/user/verify_email" component={VerifyEmail} />
              {/* <Route
                exact
                path="/user/enter_verification_code"
                component={verifyEmail}
              /> */}
              <Route
                exact
                path="/user/forgot_password"
                component={ForgotPassword}
              />
              <Route
                exact
                path="/user/reset_password"
                component={ResetPassword}
              />
              <Route
                exact
                path="/user/:action"
                component={LoginRegisterScreen}
              />
            </Switch>
          </AuthLayout>
        </Route>
        <Route
          exact
          path={[
            "/",
            "/free_previous_papers",
            "/:package/instruction/:examname/:examid",
            "/start_exam/:examname/:examid",
            "/start_exam/:examname/:examid",
            "/premium_previous_papers",
            "/practice_session",
            "/practice_session/:packageId",
            "/practice_session/:packageId/:category",
            "/practice_session/:packageId/instruction/:examname/:subjectId",
            "/feedback/:exam_name/:exam_result_id",
            "/exam_result/:exam_name/:exam_result_id",
            "/all_bookmarks",
            "/incorrect_questions",
            "/summary",
            "/my_result",
            "/my_result/view/:resultId",
          ]}
        >
          <DashboardLayout>
            <Switch>
              <ErrorBoundary>
                <ProtectedRoute exact path="/" component={HomeScreen} />
                <ProtectedRoute
                  exact
                  path="/free_previous_papers"
                  component={FreeExamsList}
                />
                <ProtectedRoute
                  exact
                  path="/:package/instruction/:examname/:examid"
                  component={ExamRules}
                />
                <ProtectedRoute
                  exact
                  path="/start_exam/:examname/:examid"
                  component={ExamScreen}
                />
                <ProtectedRoute
                  exact
                  path="/premium_previous_papers"
                  component={PremiumExamsList}
                />
                <ProtectedRoute
                  exact
                  path="/practice_session"
                  component={PracticeSession}
                />
                <ProtectedRoute
                  exact
                  path="/practice_session/:packageId"
                  component={ExamCategory}
                />
                <ProtectedRoute
                  exact
                  path="/practice_session/:packageId/:category"
                  component={SubjectsList}
                />
                <ProtectedRoute
                  exact
                  path="/practice_session/:packageId/instruction/:examname/:subjectId"
                  component={PracticeExamRules}
                />

                <ProtectedRoute
                  exact
                  path="/feedback/:exam_name/:exam_result_id"
                  component={ExamFeedbackForm}
                />
                <ProtectedRoute
                  exact
                  path="/exam_result/:exam_name/:exam_result_id"
                  component={ExamResult}
                />
                <ProtectedRoute
                  exact
                  path="/all_bookmarks"
                  component={AllBookmarkScreen}
                />
                <ProtectedRoute
                  exact
                  path="/incorrect_questions"
                  component={InCorrectQuesScreen}
                />
                <ProtectedRoute
                  exact
                  path="/summary"
                  component={SummaryScreen}
                />
                <ProtectedRoute
                  exact
                  path="/my_result"
                  component={MyResultScreen}
                />
                <ProtectedRoute
                  exact
                  path="/my_result/view/:resultId"
                  component={ViewResult}
                />
              </ErrorBoundary>
            </Switch>
          </DashboardLayout>
        </Route>

        <Route path="*">
          <DashboardLayout>
            <Switch>
              <Route
                exact
                path="*"
                render={() => <h1>Under Construction</h1>}
              />
            </Switch>
          </DashboardLayout>
        </Route>
      </Switch>
    </Router>
  );
}

// const Container = styled.div`
//   display: grid;
//   grid-template-areas: ". nav" ". main-content" ". footer";
//   grid-template-columns: 2.5rem 1fr;
//   grid-template-rows: 3.75rem auto 3.125rem;
//   height: 100%;
//   /* overflow-x: hidden; */
// `;

// const MainContent = styled.main`
//   grid-area: main-content;
//   /* background-color: lightgray; */
//   padding: 2vw;
//   /* overflow-x: hidden; */
// `;

export default App;
