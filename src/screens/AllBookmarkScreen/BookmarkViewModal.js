import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  removeUnBookmarkedQues,
  resetBookmarkedQuestion,
} from "../../api/allBookmarkSlice";
import {
  getBookmarkedQuestion,
  setBookmarkedQuesPriority,
  unBookmarkQues,
} from "../../api/allBookmarkThunk";
import CustomModal from "../../Components/CustomModal";
import { FancyButton } from "../../Components/StyledComponents";

export default function BookmarkViewModal(props) {
  const { show, toggle, data } = props;
  const { exam_result_id, qid, rowIndex, priority } = data;
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.allBookmarks.bookmarkedQuestion);
  const selectedPriority = useRef(priority);
  const [isBookmarked, setIsBookmarked] = useState(true);
  useEffect(() => {
    selectedPriority.current = priority;
    if (data.exam_result_id)
      dispatch(
        getBookmarkedQuestion({ exam_result_id, type: "bookmark", qid })
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
  const setPriority = (e) => {
    selectedPriority.current = e.target.value;
    dispatch(
      setBookmarkedQuesPriority({
        ques_no,
        exam_result_id,
        priority: selectedPriority.current,
        index: rowIndex,
      })
    );
  };

  const unBookmark = () => {
    setIsBookmarked(!isBookmarked);
    dispatch(unBookmarkQues({ exam_result_id, ques_no }));
  };
  const onModalExit = () => {
    !isBookmarked && dispatch(removeUnBookmarkedQues(rowIndex));
    setIsBookmarked(true);
    selectedPriority.current = null;
    dispatch(resetBookmarkedQuestion());
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
              <ListGroup.Item className="d-flex align-items-center">
                <FancyButton onClick={unBookmark}>
                  {isBookmarked ? (
                    <>
                      <FontAwesomeIcon
                        icon={["far", "star"]}
                        className="me-2"
                      />
                      <span>unbookmark</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={["fas", "star"]}
                        className="me-2"
                      />
                      <span>bookmark</span>
                    </>
                  )}
                </FancyButton>
                <fieldset className="ms-4 d-flex">
                  <label
                    htmlFor="priorityOptions"
                    className="align-self-center"
                  >
                    Change Priority:
                  </label>
                  <select
                    id="priorityOptions"
                    className=" ms-2 bg-dark text-white rounded px-2"
                    aria-label="change bookmarked question priority"
                    value={selectedPriority.current}
                    onChange={setPriority}
                    disabled={!isBookmarked}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </fieldset>
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
