import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FancyButton } from "./StyledComponents";
export default function Rules({ examname, examid, quesCount }) {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  return (
    <Wrapper className="d-flex flex-column justify-content-center">
      <Container>
        <FancyButton className="mb-2" onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={["fas", "arrow-left"]} />
          <span className="ps-2">Back</span>
        </FancyButton>
        <Card>
          <Card.Header as="h5">Instructions of {examname}</Card.Header>
          <Card.Body>
            <ul>
              <li>
                This test contains {quesCount} items (questions). Each item
                comprises four responses (answers). You will select the response
                which you want to mark. In case, you feel that there is more
                than one correct response, mark the response which you consider
                the best. In any case, choose ONLY ONE response for each item.
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
            <FancyButton
              disabled={!checked}
              variant="primary"
              onClick={() => {
                checked && history.push(`/start_exam/${examname}/${examid}`);
              }}
            >
              start exam
            </FancyButton>
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
