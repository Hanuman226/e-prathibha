import { useEffect, useState, useMemo, useRef } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  markReviewQuestion,
  resetAnswer,
  saveQuestion,
  startExam,
  bookmarkQuestion,
  submitExam,
  attemptTime,
} from "../../api/examThunk";
import CountDownTimer from "../../Components/CountDownTimer";
import QuestionFilter from "./QuestionFilter";
import QuestionPalette from "./QuestionPalette";
import {
  HorizontalBreak,
  StyledScrollBar,
} from "../../Components/StyledComponents";
import FinishExamModal from "./FinishExamModal";
import QuestionPaperModal from "./QuestionPaperModal";
import { questionOpened } from "../../api/examSlice";
import ProfileModal from "./ProfileModal";
import InstructionsModal from "./InstructionsModal";
import useToggle from "../../Hooks/useToggle";
import { ToastContainer, toast } from "react-toastify";
import PreLoader from "../../Components/PreLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ExamScreen() {
  const [loading, setLoading] = useState(true);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [showQuestionPaper, toggleQuestionPaper] = useToggle();
  const [showInstructions, toggleInstructions] = useToggle();
  const [showProfile, toggleProfile] = useToggle();
  const [showFinishExam, toggleFinishExam] = useToggle();
  const [quesNo, setQuesNo] = useState(0);
  const currQuesNo = useRef(1);
  const [filterOption, setFilterOption] = useState("all");
  const { examid } = useParams();
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.exam.examsData);
  const memoizedTime = useMemo(
    () => Date.now() + payload.time * 1000,
    [payload.time]
  );

  useEffect(() => {
    dispatch(startExam(examid))
      .unwrap()
      .then((res) => {
        dispatch(questionOpened({ qId: 1 }));
        dispatch(
          attemptTime({
            examId: examid,
            qId: 1,
            currQues: 1,
          })
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [examid]);

  if (loading) {
    return <PreLoader />;
  }

  const { ExamStat, Question, Exam } = payload.exam[quesNo];
  const { ques_no, exam_id, exam_result_id, review, answered } = ExamStat;
  let { option_selected } = ExamStat;
  const {
    question: { above, table, below },
    option1,
    option2,
    option3,
    option4,
    marks,
    negative_marks,
  } = Question;

  const options = [option1, option2, option3, option4];

  const isLastQuestion = payload.exam.length === Number(ques_no);

  const trackQuesAttemptTime = () => {
    if (Math.abs(Number(ques_no) - currQuesNo.current) === 1) {
      currQuesNo.current = Number(ques_no);
    }

    if (Number(ques_no) === 1) {
      dispatch(
        attemptTime({
          examId: exam_id,
          qId: Number(ques_no) + 1,
          currQues: ques_no,
        })
      );
    } else if (isLastQuestion) {
      dispatch(
        attemptTime({
          examId: exam_id,
          qId: ques_no,
          currQues: ques_no,
        })
      );
    } else {
      dispatch(
        attemptTime({
          examId: exam_id,
          qId: Number(ques_no) + 1,
          currQues: currQuesNo.current,
        })
      );
    }
  };

  const commonQuesTasks = () => {
    const qdata = {
      data: { Exam: { lang: "1", option_selected: option_selected } },
      examId: examid,
      qId: ques_no,
    };

    option_selected !== null && dispatch(saveQuestion(qdata));
    !isLastQuestion && dispatch(questionOpened({ qId: Number(ques_no) + 1 }));
    !isLastQuestion && setQuesNo((prev) => prev + 1);
    isLastQuestion && toast.info("You have reached the last question of test.");
  };

  const saveAndNext = () => {
    commonQuesTasks();
    trackQuesAttemptTime();
  };

  const markAndNext = () => {
    dispatch(
      markReviewQuestion({
        examId: examid,
        qId: ques_no,
      })
    );
    commonQuesTasks();
    trackQuesAttemptTime();
  };

  const bookmarkAndNext = () => {
    dispatch(
      bookmarkQuestion({
        examId: examid,
        qId: ques_no,
      })
    );
    commonQuesTasks();
    trackQuesAttemptTime();
  };

  const clearResponse = () => {
    option_selected !== null &&
      dispatch(
        resetAnswer({
          examId: examid,
          qId: ques_no,
        })
      );
    trackQuesAttemptTime();
    !isLastQuestion && setQuesNo((prev) => prev + 1);
  };

  const changeQues = (e) => {
    let qno = e.target.value;
    console.log(e.target);
    setQuesNo(qno - 1);
    currQuesNo.current = qno;
    console.log({ qno: qno });
  };

  const filterSelected = (e) => {
    setFilterOption(e.target.value);
  };

  const handleSubmitExam = () => {
    setSubmitInProgress(true);
    dispatch(submitExam({ examId: exam_id, examresultId: exam_result_id }))
      .unwrap()
      .then(() => {
        setSubmitInProgress(false);
        toggleFinishExam();
      });
  };

  return (
    payload.exam.length > 0 && (
      <Wrapper>
        <LeftPanel>
          <Header>
            <Text>Question No. {ques_no}</Text>
            <Text>{Question.exam_name}</Text>
            <div>
              <Text color="hsl(120deg 100% 35%)">
                Right Mark: <span>{marks}</span>
              </Text>
              <Text color="hsl(0deg 100% 50%)">
                Negative Mark: <span>{negative_marks}</span>
              </Text>
            </div>
          </Header>
          <Body>
            <div dangerouslySetInnerHTML={{ __html: above }}></div>
            {table && <div dangerouslySetInnerHTML={{ __html: table }}></div>}
            {below && <div dangerouslySetInnerHTML={{ __html: below }}></div>}
            <HorizontalBreak />
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Col sm={10}>
                  {options.map((option, index) => (
                    <div className="form-check" key={option + index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        value={index + 1}
                        id={"option" + index}
                        defaultChecked={
                          option_selected === null && answered === "0"
                            ? false
                            : parseInt(option_selected, 10) === index + 1
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          option_selected = e.target.value;
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={"option" + index}
                        dangerouslySetInnerHTML={{ __html: option }}
                      ></label>
                    </div>
                  ))}
                </Col>
              </Form.Group>
            </fieldset>
          </Body>
          <Footer>
            <div>
              <Button
                onClick={markAndNext}
                bgColor="hsl(300deg 100% 25%)"
                bgHoverColor="hsl(300deg 100% 35%)"
              >
                {!review
                  ? `Mark for Review & Next`
                  : `UnMark for Review & Next`}
              </Button>
              <Button
                onClick={clearResponse}
                bgColor="hsl(0deg 100% 40%)"
                bgHoverColor="hsl(0deg 100% 50%)"
              >
                Clear Response
              </Button>
              <Button
                onClick={bookmarkAndNext}
                bgColor="hsl(39deg 100% 40%)"
                bgHoverColor="hsl(39deg 100% 50%)"
              >
                Bookmark
              </Button>
            </div>
            <Button
              bgColor="hsl(120deg 100% 25%)"
              bgHoverColor="hsl(120deg 100% 35%)"
              onClick={() => saveAndNext()}
            >
              Save & Next
            </Button>
          </Footer>
        </LeftPanel>
        <RightPanel>
          <CountDownTimer
            examTime={memoizedTime}
            examId={exam_id}
            examresultId={exam_result_id}
            qno={payload.exam.length}
            resultId={exam_result_id}
            examName={Exam.name}
          />
          <QuestionPalette
            setQues={changeQues}
            filterOption={filterOption}
            examId={exam_id}
            qno={ques_no}
          />
          <QuestionFilter filterSelected={filterSelected} />
          <div className="d-flex fle-wrap justify-content-between">
            <Button
              bgColor="hsl(0 0% 0%)"
              bgHoverColor="hsl(0 0% 25%)"
              onClick={toggleQuestionPaper}
            >
              Question Paper
            </Button>
            <Button
              bgColor="hsl(0 0% 0%)"
              bgHoverColor="hsl(0 0% 25%)"
              onClick={toggleInstructions}
            >
              Instructions
            </Button>
            <Button
              bgColor="hsl(0 0% 0%)"
              bgHoverColor="hsl(0 0% 25%)"
              onClick={toggleProfile}
            >
              Profile
            </Button>
            <Button
              disabled={submitInProgress}
              bgColor="hsl(0 0% 0%)"
              bgHoverColor="hsl(0 0% 25%)"
              onClick={handleSubmitExam}
              className="d-flex justify-content-center align-items-center"
            >
              {submitInProgress ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <span>submit</span>
              )}
            </Button>
          </div>
        </RightPanel>

        <QuestionPaperModal
          show={showQuestionPaper}
          toggle={toggleQuestionPaper}
        />
        <InstructionsModal
          show={showInstructions}
          toggle={toggleInstructions}
          examName={Exam.name}
        />
        <ProfileModal show={showProfile} toggle={toggleProfile} />
        <FinishExamModal
          setQues={changeQues}
          show={showFinishExam}
          toggle={toggleFinishExam}
          examId={exam_id}
          resultId={exam_result_id}
          examName={Exam.name}
          qno={payload.exam.length}
        />

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    )
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 25rem;
  gap: 1rem;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Text = styled.p`
  margin-bottom: 0;
  padding-left: 1rem;
  font-weight: bold;
  & span {
    color: ${(props) => (props.color ? props.color : "white")};
  }
`;

const Button = styled.button`
  height: 2.5rem;
  border: none;
  text-transform: uppercase;
  padding: 0.625rem;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "black")};
  color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  &:hover {
    background-color: ${(props) =>
      props.bgHoverColor ? props.bgHoverColor : "black"};
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
`;
const RightPanel = styled.div`
  background-color: hsl(191deg 19% 65%);
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
`;

const Header = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  background-color: black;
  color: white;
  &:first-child {
    padding-left: 0;
  }
  & div {
    display: flex;
    justify-content: space-between;
  }
`;
const Body = styled(StyledScrollBar)`
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1rem;
`;
const Footer = styled.div`
  margin-top: auto;
  /* height: 4rem; */
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: black;

  & div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }

  & div button {
    margin-left: 1rem;
  }
  & div button:first-of-type {
    margin-left: 0;
  }
`;
