import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MarksWiseChart from "./MarksWiseChart";
import PerformanceChart from "./PerformanceChart";

export default function ScoreCard() {
  const payload = useSelector((state) => state.exam.examResult);
  if (!payload) {
    return <h3>Loading... </h3>;
  }

  const {
    examDetails: { Exam, Result },
  } = payload;

  return (
    <>
      <Container>
        <p className="fs-5">
          <span className="fw-bold">Score Card For </span>
          {Exam.name}
        </p>
        <Row className="d-flex  justify-content-between flex-wrap mb-5" flush>
          <List>
            <List.Item className="d-flex justify-content-between">
              My Marks{" "}
              <span className="text-primary fw-bold">
                {Result.obtained_marks}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Marks of Test{" "}
              <span className="text-primary fw-bold">
                {Result.total_marks}{" "}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Questions in Test{" "}
              <span className="text-primary fw-bold">
                {Result.total_question}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Time of Test{" "}
              <span className="text-primary fw-bold">{Exam.duration} Mins</span>
            </List.Item>
          </List>
          <List>
            <List.Item className="d-flex justify-content-between">
              Correct Question{" "}
              <span className="text-primary fw-bold">
                {payload.correctQuestion}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              My Percentile{" "}
              <span className="text-primary fw-bold">{Result.percentile}</span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Answered Question in Test{" "}
              <span className="text-primary fw-bold">
                {Result.total_answered}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              My Time{" "}
              <span className="text-primary fw-bold">{Result.myTime}</span>
            </List.Item>
          </List>
          <List>
            <List.Item className="d-flex justify-content-between">
              InCorrect Question{" "}
              <span className="text-primary fw-bold">
                {payload.incorrectQuestion}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Right Marks{" "}
              <span className="text-primary fw-bold">
                {payload.rightMarksArr.ExamStat.total_marks}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Left Question{" "}
              <span className="text-primary fw-bold">
                {payload.leftQuestion}
              </span>
            </List.Item>
          </List>
          <List>
            <List.Item className="d-flex justify-content-between">
              Negative Marks{" "}
              <span className="text-primary fw-bold">
                {payload.negativeMarksArr.ExamStat.total_marks}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Left Question Marks{" "}
              <span className="text-primary fw-bold">
                {payload.leftQuestionArr.ExamStat.left_marks}
              </span>
            </List.Item>
          </List>
        </Row>
        <Row>
          <Col sm={12} lg={6}>
            <PerformanceChart
              totalMarks={Result.total_marks}
              obtainedMarks={Result.obtained_marks}
              examName={Exam.name}
            />
          </Col>
          <Col sm={12} lg={6}>
            <MarksWiseChart
              correctQuestion={Number(payload.correctQuestion)}
              incorrectQuestion={Number(payload.incorrectQuestion)}
              rightMarks={Number(payload.rightMarksArr.ExamStat.total_marks)}
              negativeMarks={Number(
                payload.negativeMarksArr.ExamStat.total_marks
              )}
              examName={Exam.name}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

const List = styled(ListGroup)`
  width: 25%;
  margin: 0 auto;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
