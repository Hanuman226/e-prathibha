import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { startExam } from "../actions/examActions";
import CountDownTimer from "./exams/CountDownTimer";
import QuestionPalette from "./exams/QuestionPalette";

export default function ExamScreen() {
  const [quesNo, setQuesNo] = useState(0);
  const { examid } = useParams();
  const dispatch = useDispatch();
  const examInfo = useSelector((state) => state.startExam);
  const { loading, examData, error } = examInfo;

  useEffect(() => {
    dispatch(startExam(examid));
  }, []);

  if (examData === undefined) {
    return <h1>Loading...</h1>;
  }

  const { ExamStat, Question, Exam } = examData.exam[quesNo];
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

  return (
    <Wrapper>
      <LeftPanel>
        <Header>
          <Text>Question No. {quesNo + 1}</Text>
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
                      id={"option" + index}
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
              bgColor="hsl(300deg 100% 25%)"
              bgHoverColor="hsl(300deg 100% 35%)"
            >
              Mark for Review & Next
            </Button>
            <Button
              bgColor="hsl(0deg 100% 40%)"
              bgHoverColor="hsl(0deg 100% 50%)"
            >
              Clear Response
            </Button>
            <Button
              bgColor="hsl(39deg 100% 40%)"
              bgHoverColor="hsl(39deg 100% 50%)"
            >
              Bookmark
            </Button>
          </div>
          <Button
            bgColor="hsl(120deg 100% 25%)"
            bgHoverColor="hsl(120deg 100% 35%)"
            onClick={() => setQuesNo((prev) => prev + 1)}
          >
            Save & Next
          </Button>
        </Footer>
      </LeftPanel>
      <RightPanel>
        {/* <CountDownTimer examTime={parseInt(examData.time, 10)} /> */}
        <CountDownTimer examTime={parseInt(15, 10)} />
        <QuestionPalette />
      </RightPanel>
    </Wrapper>
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

const HorizontalBreak = styled.hr`
  height: 1.5px;
  background-color: silver;
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
  background-color: hsl(300deg 100% 25%);
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
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
const Body = styled.div`
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1rem;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    box-shadow: inset 0 0 2px grey;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.3rem;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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
