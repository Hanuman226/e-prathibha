import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
export default function ExamRules() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  let { examname, examid } = useParams();
  return (
    <Wrapper className="d-flex flex-column justify-content-center">
      <Container>
        <BackButton onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={["fas", "arrow-left"]} />
          <span className="ps-2">Back</span>
        </BackButton>
        <Card>
          <Card.Header as="h5">Instructions of {examname}</Card.Header>
          <Card.Body>
            <ul>
              <li>
                This test contains 120 items (questions). Each item comprises
                four responses (answers). You will select the response which you
                want to mark. In case, you feel that there is more than one
                correct response, mark the response which you consider the best.
                In any case, choose ONLY ONE response for each item.
              </li>
              <li>All items carry equal marks.</li>
              <li>Penalty for wrong Answers :</li>
            </ul>
            <p>
              THERE WILL BE PENALTY FOR WRONG ANSWERS MARKED BY A CANDIDATE IN
              THE OBJECTIVE TYPE QUESTION PAPERS.
            </p>
            <ul>
              <li>
                There are four alternatives for the answer to every question.
                For each question for which a wrong answer has been given by the
                candidate, two-third of the marks assigned to that question will
                be deducted as penalty.
              </li>
              <li>
                If a candidate gives more than one answer, it will be treated as
                a wrong answer even if one of the given answers happens to be
                correct and there will be same penalty as above to that
                question.
              </li>
              <li>
                If a question is left blank i.e., no answer is given by the
                candidate, there will be no penalty for that question.
              </li>
            </ul>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                onChange={() => setChecked(!checked)}
                checked={checked}
                type="checkbox"
                label="I am ready to begin"
              />
            </Form.Group>
            <Button
              disabled={!checked}
              variant="primary"
              onClick={() => {
                checked && history.push(`/free-previous-papers/exam/${examid}`);
              }}
            >
              start exam
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  & ul {
    list-style: num;
  }
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  height: 2.5rem;
  width: 6.25rem;
  border-radius: 0.625rem;
  border: none;
  text-transform: uppercase;
  padding: 0.625rem;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: black;
  color: white;
  cursor: pointer;
  box-shadow: 0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%);
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    box-shadow: none;
  }
`;

const Button = styled.a`
  height: 2.5rem;
  width: 6.25rem;
  border-radius: 0.625rem;
  border: none;
  text-decoration: none;
  color: white !important;
  user-select: none;
  text-transform: uppercase;
  padding: 0.625rem;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${(props) => (props.disabled ? "gray" : "black")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%)"};
  outline: none;
  transition: all 0.2s;
  &:active {
    box-shadow: none;
  }
`;
