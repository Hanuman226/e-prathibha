import { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOverAllReport } from "../../api/overAllReportSlice";
import { Wrapper } from "../../Components/StyledComponents";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import { toast, ToastContainer } from "react-toastify";
import PreLoader from "../../Components/PreLoader";
export default function OverAllReportScreen() {
  const dispatch = useDispatch();
  const { overAllReport } = useSelector((state) => state.overAllReport);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getOverAllReport())
      .unwrap()
      .then((res) => {
        if (res.status !== 200) {
          toast.error(res.data);
          return;
        }
      })
      .catch((err) => console.log(err))
      .fianally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Wrapper>
      <Container flush>
        <h3>Over All Report</h3>
        <Row className="d-flex  justify-content-between flex-wrap mb-5" flush>
          <List>
            <List.Item className="d-flex justify-content-between">
              My Marks{" "}
              <span className="text-primary fw-bold">
                {overAllReport.my_marks}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Marks of Test{" "}
              <span className="text-primary fw-bold">
                {overAllReport.total_mrks}{" "}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Questions in Test{" "}
              <span className="text-primary fw-bold">
                {overAllReport.total_question}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Time of Test{" "}
              <span className="text-primary fw-bold">
                {overAllReport.Total_time}{" "}
              </span>
            </List.Item>
          </List>
          <List>
            <List.Item className="d-flex justify-content-between">
              Correct Question{" "}
              <span className="text-primary fw-bold">
                {overAllReport.correctQuestion}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              My Percentile{" "}
              <span className="text-primary fw-bold">
                {overAllReport.percentile}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Total Answered Question in Test{" "}
              <span className="text-primary fw-bold">
                {overAllReport.total_answered}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              My Time{" "}
              <span className="text-primary fw-bold">
                {overAllReport.myTime}
              </span>
            </List.Item>
          </List>
          <List>
            <List.Item className="d-flex justify-content-between">
              InCorrect Question{" "}
              <span className="text-primary fw-bold">
                {overAllReport.incorrectQuestion}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Right Marks{" "}
              <span className="text-primary fw-bold">
                {overAllReport.rightMarks}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Left Question{" "}
              <span className="text-primary fw-bold">
                {overAllReport.leftQuestion}
              </span>
            </List.Item>
          </List>
          <List>
            <List.Item className="d-flex justify-content-between">
              Negative Marks{" "}
              <span className="text-primary fw-bold">
                {overAllReport.negativeMarks}
              </span>
            </List.Item>
            <List.Item className="d-flex justify-content-between">
              Left Question Marks{" "}
              <span className="text-primary fw-bold">
                {overAllReport.leftQuestionMarks}
              </span>
            </List.Item>
          </List>
        </Row>
        <Row>
          <Col sm={12} lg={6}>
            <BarGraph />
          </Col>
          <Col sm={12} lg={6}>
            <PieChart />
          </Col>
        </Row>
      </Container>
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

const List = styled(ListGroup)`
  width: 25%;
  margin: 0 auto;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
