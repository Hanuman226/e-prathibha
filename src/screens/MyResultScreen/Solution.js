import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Accordion, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { unBookmarkQues } from "../../api/allBookmarkThunk";
import { FancyButton } from "../../Components/StyledComponents";
import { ToastContainer, toast } from "react-toastify";
import { bookmarkQues } from "../../api/examSlice";
export default function Solution() {
  const { examResult } = useSelector((state) => state.exam);
  const [quesNo, setQuesNo] = useState(0);
  const dispatch = useDispatch();

  const { ExamStat, Question } = examResult.post[quesNo];
  const {
    examDetails: { Exam },
    userSectionQuestion,
  } = examResult;

  const {
    option_selected,
    correct_answer,
    marks,
    marks_obtained,
    time_taken,
    ques_status,
    ques_no,
    exam_result_id,
    bookmark,
  } = ExamStat;

  const {
    question: { above, table, below } = {},
    option1,
    option2,
    option3,
    option4,
    explanation,
  } = Question;

  const options = [option1, option2, option3, option4];

  const unBookmark = () => {
    dispatch(unBookmarkQues({ exam_result_id, ques_no }))
      .unwrap()
      .then((payload) => {
        const { status, data } = payload;
        if (status === 200) {
          dispatch(bookmarkQues({ ques_no }));
          toast.success(`${data} Question No. ${ques_no}`);
        } else {
          toast.warn(data);
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Wrapper>
      <Row className="mb-3">
        <Col sm={12} md={4}>
          <Accordion defaultActiveKey={0} className="mb-sm-3 mb-0">
            {userSectionQuestion.map((cate, index) => {
              const category = Object.entries(cate).flat();
              return (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{category[0]}</Accordion.Header>
                  <StyledAccordionBody>
                    {category[1].map((item) => (
                      <FancyButton
                        className=" fs-6 w-100"
                        value={parseInt(item.ExamStat.ques_no) - 1}
                        onClick={(e) => setQuesNo(parseInt(e.target.value))}
                      >
                        {item.ExamStat.ques_no}
                      </FancyButton>
                    ))}
                  </StyledAccordionBody>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Col>
        <Col sm={12} md={8}>
          <Card className="my-auto fw-bold">
            <Card.Header>Solution For {Exam.name}</Card.Header>
            <StyledCardBody>
              <ListGroup>
                <ListGroup.Item
                  className={` ${
                    ques_status === "R"
                      ? "text-success"
                      : ques_status === "W"
                      ? "text-danger"
                      : "text-primary"
                  }`}
                >
                  <p className="text-dark">Question No. {ques_no}</p>
                  <div dangerouslySetInnerHTML={{ __html: above }}></div>
                  {table && (
                    <div dangerouslySetInnerHTML={{ __html: table }}></div>
                  )}
                  {below && (
                    <div dangerouslySetInnerHTML={{ __html: below }}></div>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <fieldset>
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={10}>
                        {options.map((option, index) => {
                          let optionsBgColor =
                            Number(correct_answer) === Number(index + 1)
                              ? "#46d046"
                              : Number(option_selected) === Number(index + 1)
                              ? "red"
                              : "";

                          return (
                            <StyledDiv
                              borderColor={optionsBgColor}
                              key={option + index}
                            >
                              <StyledInput
                                bgColor={optionsBgColor}
                                color={optionsBgColor}
                                type="radio"
                                value={index + 1}
                                key={"option" + index}
                                checked={
                                  Number(correct_answer) ===
                                    Number(index + 1) ||
                                  Number(option_selected) === Number(index + 1)
                                    ? true
                                    : false
                                }
                                readOnly
                              />
                              <label
                                className="form-check-label "
                                dangerouslySetInnerHTML={{ __html: option }}
                              ></label>
                            </StyledDiv>
                          );
                        })}
                      </Col>
                    </Form.Group>
                  </fieldset>
                </ListGroup.Item>
                <Row>
                  <Col>
                    <ListGroup.Item
                      className={`${!ques_status && "text-primary"}`}
                    >
                      {option_selected === null ? "Not Attempt" : "Attempt"}
                    </ListGroup.Item>
                  </Col>
                  {option_selected && (
                    <Col>
                      <ListGroup.Item>
                        <span
                          className={`${
                            ques_status === "R" ? "text-success" : "text-danger"
                          }`}
                        >
                          {ques_status && ques_status === "R"
                            ? "Correct"
                            : "InCorrect"}
                        </span>
                      </ListGroup.Item>
                    </Col>
                  )}
                </Row>
                {ques_status && (
                  <ListGroup.Item>
                    {ques_status === "W" && (
                      <span>
                        Your Answer:{" "}
                        <span className="text-danger">
                          {" "}
                          {"Option " + option_selected}
                        </span>{" "}
                      </span>
                    )}
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  Correct Answer:{" "}
                  <span className="text-success">
                    {"Option " + correct_answer}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>Max Marks: {marks}</ListGroup.Item>
                {ques_status && (
                  <ListGroup.Item>
                    Marks Scored: {marks_obtained}
                  </ListGroup.Item>
                )}
                <ListGroup.Item>Time Taken: {time_taken}</ListGroup.Item>
                <ListGroup.Item>
                  Solution:
                  <p dangerouslySetInnerHTML={{ __html: explanation }}></p>
                </ListGroup.Item>
              </ListGroup>
            </StyledCardBody>
            <Card.Footer className="d-flex align-items-center">
              <FancyButton
                disabled={quesNo === 0}
                onClick={() => setQuesNo((prev) => prev - 1)}
                className="px-3 me-5"
              >
                <FontAwesomeIcon
                  icon={["fas", "arrow-left"]}
                  className="me-2"
                />
                <span>Prev</span>
              </FancyButton>
              <FancyButton
                disabled={quesNo === examResult.post.length - 1}
                onClick={() => setQuesNo((prev) => prev + 1)}
                className="px-3 me-5"
              >
                <span>Next</span>
                <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="ms-2"
                />
              </FancyButton>
              <FancyButton onClick={unBookmark} className="px-3 ">
                {bookmark ? (
                  <>
                    <FontAwesomeIcon icon={["far", "star"]} className="me-2" />
                    <span>unbookmark</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={["fas", "star"]} className="me-2" />
                    <span>bookmark</span>
                  </>
                )}
              </FancyButton>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
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
  );
}

const StyledDiv = styled.div.attrs((props) => ({
  className: "form-check rounded py-2",
}))`
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : "transparent"};
  border-width: 2px;
  border-style: solid;
  padding-left: 30px;
`;

const StyledInput = styled.input.attrs((props) => ({
  className: "form-check-input",
}))`
  &:checked {
    background-color: ${(props) => (props.bgColor ? props.bgColor : "")};
    border-color: ${(props) => (props.color ? props.color : "")};
    box-shadow: none;
  }
  & + label {
    & > p {
      margin-bottom: 0;
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const styledScrollBar = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 15px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    box-shadow: inset 0 0 2px grey;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: hsl(0deg 0% 10% / 20%);
    border-radius: 0.3rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(0deg 0% 10% / 40%);
  }
`;
const StyledCardBody = styled(Card.Body)`
  height: 75vh;
  overflow: auto;
  ${styledScrollBar}
`;

const StyledAccordionBody = styled(Accordion.Body)`
  height: 30vh;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.5rem, 2.5rem));
  grid-template-rows: repeat(auto-fill, minmax(2.5rem, 2.5rem));
  place-items: center;
  gap: 0.5rem;
  ${styledScrollBar}
`;
