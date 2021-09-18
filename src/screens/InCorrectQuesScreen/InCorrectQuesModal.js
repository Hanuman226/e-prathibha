import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resetInCorrectQues } from "../../api/InCorrectQuesSlice";
import { getInCorrectQuestion } from "../../api/InCorrectQuesThunk";
import CustomModal from "../../Components/CustomModal";
import { FancyButton } from "../../Components/StyledComponents";

export default function InCorrectQuesModal(props) {
  const { show, toggle, data } = props;
  const { id, exam_result_id, qid, rowIndex, priority } = data;
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.inCorrectQues.inCorrectQues);
  useEffect(() => {
    if (data.exam_result_id)
      dispatch(
        getInCorrectQuestion({ id, exam_result_id, type: "incorrect", qid })
      );
  }, [data]);

  const {
    ExamStat = {},
    Question = {},
    Exam: { name } = {},
  } = payload[0] || {};

  const {
    option_selected,
    ques_no,
    correct_answer,
    marks,
    marks_obtained,
    time_taken,
    ques_status,
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

  const onModalExit = () => {
    dispatch(resetInCorrectQues());
  };

  return (
    <CustomModal
      show={show}
      toggle={toggle}
      title={"Bookmark View"}
      size="xl"
      onExit={onModalExit}
      backdrop="static"
      keyboard={false}
    >
      {!payload.length ? (
        <h4>Please Wait...</h4>
      ) : (
        <Card className="my-auto fw-bold">
          <Card.Header>Solution For {name}</Card.Header>
          <Card.Body>
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
                                Number(correct_answer) === Number(index + 1) ||
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
                <ListGroup.Item>Marks Scored: {marks_obtained}</ListGroup.Item>
              )}
              <ListGroup.Item>Time Taken: {time_taken}</ListGroup.Item>
              <ListGroup.Item>
                Solution:
                <p dangerouslySetInnerHTML={{ __html: explanation }}></p>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </CustomModal>
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
