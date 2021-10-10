import { useState } from "react";
import { Accordion, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import {
  createExamOnSearchedQues,
  resetSearchedQuesData,
} from "../../api/searchQuesSlice";
import { FancyButton, Wrapper } from "../../Components/StyledComponents";

export default function SearchedQuestions({ keyword }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    searchedQuestions: { search, count },
  } = useSelector((state) => state.searchQues);

  // improvement required for selected questions logic
  const selectQuestions = search.map(({ questions: { id } }) => ({
    key: id,
    value: id,
    checked: false,
  }));
  const [selectedQuestions, setSelectedQuestions] = useState(selectQuestions);
  
  const handleAllChecked = (e) => {
    let questions = selectedQuestions;
    questions.map((item) => (item.checked = e.target.checked));
    setSelectedQuestions([...questions]);
  };


  const handleCheckBoxChange = (e) => {
    let questions = selectedQuestions;
    questions.map((item) => {
      if (item.value === e.target.value) item.checked = e.target.checked;
      return item;
    });
    setSelectedQuestions([...questions]);
  };

  const question_ids_arr = selectedQuestions
    .filter((item) => item.checked === true)
    .map((item) => item.value);

  const createExamOnChosenQuestions = () => {
    if (!question_ids_arr.length) {
      toast.error("Please select questions to create exam on them");
      return;
    }

    setLoading(true);
    dispatch(createExamOnSearchedQues({ question_ids_arr }))
      .unwrap()
      .then((res) => {
        setLoading(false);
        history.push(
          `/searched_question_exam/instruction/${res.Exam.name}/${res.Exam.id}`
        );
      })
      .catch((_) => setLoading(false));

    dispatch(resetSearchedQuesData());
  };
  return (
    <Wrapper>
      <Row className="mb-3 d-flex align-items-center rounded mx-0 sticky-top bg-white shadow shadow-md pb-3">
        <p className="text-center fw-bold fs-5 ">
          Select questions to create exam on them
        </p>
        <Col>
          <Form.Group controlId="selectAll">
            <Form.Check
              type="checkbox"
              label="Select / UnSelect All"
              defaulChecked={false}
              onChange={handleAllChecked}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <p className="mb-0">
            Total No Of Questions : <span className="fw-bold"> {count}</span>
          </p>
          <p className="mb-0">
            Total Questions Selected :{" "}
            <span className="fw-bold"> {question_ids_arr.length}</span>
          </p>
        </Col>
        <Col className="d-flex justify-content-end">
          <FancyButton onClick={createExamOnChosenQuestions} disabled={loading}>
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Create Exam"
            )}
          </FancyButton>
        </Col>
      </Row>
      <Row className="ps-0">
        <Col sm={12}>
          <StyledAccordion defaultActiveKey={0}>
            {search.map((searchedQues, i) => {
              const {
                Exam,
                questions,
                Subject: { subject_name },
              } = searchedQues;
              const {
                question: { above, table, below },
                id,
                option1,
                option2,
                option3,
                option4,
                answer,
                marks,
                negative_marks,
                explanation,
              } = questions;
              const options = [option1, option2, option3, option4];

              return (
                <Row className="my-3 " key={id}>
                  <Col sm={1} className=" d-flex justify-content-center px-0">
                    <Form.Group className="mb-3 " controlId={id}>
                      <Form.Check
                        type="checkbox"
                        checked={selectedQuestions[i].checked}
                        value={selectedQuestions[i].value}
                        onChange={handleCheckBoxChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={11}>
                    <Accordion.Item
                      eventKey={i}
                      className={` border border-3 ${
                        selectedQuestions[i].checked
                          ? "border-success"
                          : "border-danger"
                      } shadow shadow-lg`}
                    >
                      <Accordion.Header>
                        <Row>
                          <div
                            dangerouslySetInnerHTML={{ __html: above }}
                          ></div>
                          {table && (
                            <div
                              dangerouslySetInnerHTML={{ __html: table }}
                            ></div>
                          )}
                          {below && (
                            <div
                              dangerouslySetInnerHTML={{ __html: below }}
                            ></div>
                          )}
                          <p className="fw-bold">Exam: {Exam.name}</p>
                          <p className="fw-bold">Subject: {subject_name}</p>
                        </Row>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ListGroup>
                          <ListGroup.Item className="fw-bold">
                            Exam Name: {Exam.name}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <span className="fw-bold"> Question:</span>
                            <div
                              dangerouslySetInnerHTML={{ __html: above }}
                            ></div>
                            {table && (
                              <div
                                dangerouslySetInnerHTML={{ __html: table }}
                              ></div>
                            )}
                            {below && (
                              <div
                                dangerouslySetInnerHTML={{ __html: below }}
                              ></div>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <ul style={{ listStyle: "decimal" }}>
                              {options.map((option, index) => (
                                <li>
                                  <p
                                    key={option + index}
                                    dangerouslySetInnerHTML={{ __html: option }}
                                  ></p>
                                </li>
                              ))}
                            </ul>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <p className="mb-0">
                              {" "}
                              Correct Answer :
                              <span className="text-success fw-bold">
                                {" "}
                                option {answer}
                              </span>
                            </p>
                          </ListGroup.Item>
                          <ListGroup.Item>Max Marks : {marks}</ListGroup.Item>
                          <ListGroup.Item>
                            Negative Marks : {negative_marks}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Solution:
                            <div
                              dangerouslySetInnerHTML={{ __html: explanation }}
                            ></div>
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Col>
                </Row>
              );
            })}
          </StyledAccordion>
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

const StyledAccordion = styled(Accordion)`
  & > .accordion-button:focus {
    box-shadow: none;
  }
`;
