import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FancyButton, Wrapper } from "../../Components/StyledComponents";

export default function ExamFeedbackForm() {
  const feedbackQuestions = [
    {
      ques: "1.The test instructions were",
      option1: "Largely Clear",
      option2: "Medium Clear",
      option3: "Not Clear",
    },
    {
      ques: "2.Language of question was",
      option1: "Largely Clear",
      option2: "Medium Clear",
      option3: "Not Clear",
    },
    {
      ques: "3.Overall test experience was",
      option1: "Good",
      option2: "Better",
      option3: "Best",
    },
  ];
  return (
    <Container>
      <Wrapper>
        <Card className="my-auto">
          <Card.Header className="text-center">
            Thank you for using the test
          </Card.Header>
          <Card.Body>
            {feedbackQuestions.map((feedback, index) => {
              return (
                <Col lg={8}>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId={"feedback" + index}
                  >
                    <Form.Label column lg={6}>
                      {feedback.ques}
                    </Form.Label>
                    <Col lg={6}>
                      <Form.Select aria-label="exam feedback">
                        <option value="1">{feedback.option1}</option>
                        <option value="2">{feedback.option2}</option>
                        <option value="3">{feedback.option3}</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                </Col>
              );
            })}
            <Col lg={8}>
              <Form.Group as={Row} className="mb-3" controlId={"feedback"}>
                <Col lg={6}>
                  <Form.Label>Feedback</Form.Label>
                </Col>
                <Col lg={6}>
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a feedback here"
                    style={{ height: "100px" }}
                  />
                </Col>
              </Form.Group>
            </Col>
            <div className="d-flex">
              <FancyButton as={Link} to="/exam_result">
                <FontAwesomeIcon icon={["fas", "plus"]} className="me-2" />
                Submit
              </FancyButton>
              <FancyButton as={Link} to="/exam_result" className="ms-4">
                <FontAwesomeIcon icon={["fas", "times"]} className="me-2" />
                close
              </FancyButton>
            </div>
          </Card.Body>
        </Card>
      </Wrapper>
    </Container>
  );
}
