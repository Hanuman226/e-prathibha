import { useEffect, useState, useMemo } from "react";
import { Col, Form, Row } from "react-bootstrap";
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
} from "../../api/examThunk";
import useModal from "../../Hooks/useModal";
import CountDownTimer from "../../Components/CountDownTimer";
import QuestionFilter from "./QuestionFilter";
import QuestionPalette from "./QuestionPalette";
import {
  HorizontalBreak,
  styledScrollBar,
} from "../../Components/StyledComponents";
import FinishExamModal from "./FinishExamModal";
import QuestionPaperModal from "./QuestionPaperModal";

export default function ExamScreen() {
  const [show1, toggle1] = useModal();
  const [show2, toggle2] = useModal();
  const [quesNo, setQuesNo] = useState(0);
  const [filterOption, setFilterOption] = useState("all");
  const { examid } = useParams();
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.exam.examsData);
  const memoizedTime = useMemo(
    () => Date.now() + payload.time * 1000,
    [payload.time]
  );

  useEffect(() => {
    dispatch(startExam(examid));
  }, [examid]);

  if (!payload.exam.length) {
    return <h1>Loading...</h1>;
  }

  const { ExamStat, Question } = payload.exam[quesNo];
  let { option_selected, ques_no, exam_id, exam_result_id, review, answered } =
    ExamStat;
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

  const saveAndNext = () => {
    let qdata = {
      data: { Exam: { lang: "1", option_selected: option_selected } },
      examId: examid,
      qId: ques_no,
    };
    option_selected !== null && dispatch(saveQuestion(qdata));
    payload.exam.length !== Number(ques_no) && setQuesNo((prev) => prev + 1);
  };

  const markAndNext = () => {
    let qdata = {
      data: { Exam: { lang: "1", option_selected: option_selected } },
      examId: examid,
      qId: ques_no,
    };
    dispatch(
      markReviewQuestion({
        examId: examid,
        qId: ques_no,
      })
    );
    option_selected !== null && dispatch(saveQuestion(qdata));
    payload.exam.length !== Number(ques_no) && setQuesNo((prev) => prev + 1);
  };

  const bookmarkAndNext = () => {
    let qdata = {
      data: { Exam: { lang: "1", option_selected: option_selected } },
      examId: examid,
      qId: ques_no,
    };
    dispatch(
      bookmarkQuestion({
        examId: examid,
        qId: ques_no,
      })
    );
    option_selected !== null && dispatch(saveQuestion(qdata));
    payload.exam.length !== Number(ques_no) && setQuesNo((prev) => prev + 1);
  };

  const clearResponse = () => {
    dispatch(
      resetAnswer({
        examId: examid,
        qId: ques_no,
      })
    );
    payload.exam.length !== Number(ques_no) && setQuesNo((prev) => prev + 1);
  };

  const changeQues = (e) => {
    let qno = e.target.value || 1;
    setQuesNo(qno - 1);
  };

  const filterSelected = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    payload.exam.length > 0 && (
      <Wrapper>
        <LeftPanel>
          <Header>
            <Text>Question No. {ques_no}</Text>
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
          <CountDownTimer examTime={memoizedTime} />
          <QuestionPalette setQues={changeQues} filterOption={filterOption} />
          <QuestionFilter filterSelected={filterSelected} />
          <div className="d-flex fle-wrap justify-content-between">
            <Button
              bgColor="hsl(0 0% 0%)"
              bgHoverColor="hsl(0 0% 25%)"
              onClick={toggle1}
            >
              Question Paper
            </Button>
            <Button bgColor="hsl(0 0% 0%)" bgHoverColor="hsl(0 0% 25%)">
              Instructions
            </Button>
            <Button bgColor="hsl(0 0% 0%)" bgHoverColor="hsl(0 0% 25%)">
              Profile
            </Button>
            <Button
              bgColor="hsl(0 0% 0%)"
              bgHoverColor="hsl(0 0% 25%)"
              onClick={() => {
                dispatch(
                  submitExam({ examId: exam_id, examresultId: exam_result_id })
                );
                toggle2();
              }}
            >
              Submit
            </Button>
          </div>
        </RightPanel>

        <QuestionPaperModal show={show1} toggle={toggle1} />
        <FinishExamModal
          setQues={changeQues}
          show={show2}
          toggle={toggle2}
          examId={exam_id}
          qno={payload.exam.length}
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
  /* box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%); */
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

// const HorizontalBreak = styled.hr`
//   height: 1.5px;
//   background-color: silver;
// `;

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
  /* width: 20rem; */
  /* border-radius: 0.625rem; */
  border: none;
  text-transform: uppercase;
  padding: 0.625rem;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "black")};
  color: white;
  cursor: pointer;
  /* box-shadow:${(props) =>
    props.disabled
      ? "none"
      : "0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%)"}; */
  outline: none;
  transition: all 0.2s;
  &:hover {
    background-color: ${(props) =>
      props.bgHoverColor ? props.bgHoverColor : "black"};
  }
  /* &:active {
    box-shadow: none;
  } */
`;

const LeftPanel = styled.div`
  /* background-color: red; */
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
const Body = styled(styledScrollBar)`
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
