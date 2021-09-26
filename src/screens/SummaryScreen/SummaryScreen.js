import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSubjects } from "../../api/summaryThunk";
import { StyledSelect } from "../../Components/StyledComponents";
import { Wrapper, FancyButton } from "../../Components/StyledComponents";
import PerformanceChart from "./PerformanceChart";
import ProgressSummaryChart from "./ProgressSummaryChart";
import TimeManangementChart from "./TimeManagementChart";

const defaultOption = {
  subjectId: "",
  difficulty: "",
};
export default function SummaryScreen() {
  const [key, setKey] = useState(0);
  const [optionSelected, setOptionSelected] = useState(defaultOption);
  const [submitData, setSubmitData] = useState(defaultOption);
  const { subjectId, difficulty } = submitData;
  const dispatch = useDispatch();
  const { subjects, loading } = useSelector((state) => state.summary);
  useEffect(() => {
    dispatch(getSubjects());
  }, []);

  const optionSelection = (e) => {
    setOptionSelected({ ...optionSelected, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitData(optionSelected);
  };

  return (
    <>
      <Wrapper>
        <div className="d-flex justify-content-center">
          <FancyButton
            tab
            className="mx-2"
            active={key === 0}
            onClick={() => {
              setKey(0);
              // setOptionSelected(defaultOption);
              // dispatch(resetSummaryData());
              // setSubmitData(defaultOption);
            }}
          >
            Time Manangement
          </FancyButton>
          <FancyButton
            tab
            className="mx-2"
            active={key === 1}
            onClick={() => {
              setKey(1);
              // setOptionSelected(defaultOption);
              // dispatch(resetSummaryData());
              // setSubmitData(defaultOption);
            }}
          >
            Progress Summary
          </FancyButton>
          <FancyButton
            tab
            className="mx-2"
            active={key === 2}
            onClick={() => {
              setKey(2);
              // setOptionSelected(defaultOption);
              // dispatch(resetSummaryData());
              // setSubmitData(defaultOption);
            }}
          >
            performance
          </FancyButton>
        </div>
        <Container className="d-flex justify-content-center mt-4">
          <Row className="d-flex justify-content-center w-100  ">
            <Form.Group
              as={Row}
              className=" justify-content-center g-2"
              controlId={"subjects"}
            >
              <Form.Label column lg={1} className="fw-bold">
                Subject
              </Form.Label>
              <Col lg={6}>
                <StyledSelect
                  id="subjects"
                  className="form-select me-3 "
                  aria-label="choose subject"
                  value={optionSelected.subjectId}
                  name="subjectId"
                  onChange={optionSelection}
                  disabled={loading}
                >
                  <option value="">All</option>
                  {Object.entries(subjects).map((subject) => (
                    <option value={subject[0]}>{subject[1]}</option>
                  ))}
                </StyledSelect>
              </Col>
              <Col lg={2}>
                {key !== 2 && (
                  <FancyButton type="submit" onClick={handleSubmit}>
                    {loading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={["fas", "plus"]}
                          className="me-2"
                        />
                        <span>submit</span>
                      </>
                    )}
                  </FancyButton>
                )}
              </Col>
            </Form.Group>
            {key === 2 && (
              <Form.Group
                as={Row}
                className=" justify-content-center g-2"
                controlId={"difficulty"}
              >
                <Form.Label column lg={1} className="fw-bold">
                  Difficulty
                </Form.Label>
                <Col lg={6}>
                  <StyledSelect
                    id="difficulty"
                    className="form-select me-3 "
                    aria-label="choose difficulty level"
                    name="difficulty"
                    onChange={optionSelection}
                    value={optionSelected.difficulty}
                    disabled={loading}
                  >
                    <option value="">All</option>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </StyledSelect>
                </Col>
                <Col lg={2}>
                  <FancyButton type="submit" onClick={handleSubmit}>
                    {loading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={["fas", "plus"]}
                          className="me-2"
                        />
                        <span>submit</span>
                      </>
                    )}
                  </FancyButton>
                </Col>
              </Form.Group>
            )}
          </Row>
        </Container>
      </Wrapper>
      <Wrapper className="mt-4 d-flex justify-content-center">
        {key === 0 && <TimeManangementChart subjectId={subjectId} />}
        {key === 1 && <ProgressSummaryChart subjectId={subjectId} />}
        {key === 2 && (
          <PerformanceChart subjectId={subjectId} difficulty={difficulty} />
        )}
      </Wrapper>
    </>
  );
}
