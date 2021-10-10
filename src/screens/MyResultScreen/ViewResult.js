import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { examResult } from "../../api/examThunk";
import { FancyButton, Wrapper } from "../../Components/StyledComponents";
import ScoreCard from "./ScoreCard";
import Solution from "./Solution";
import SubjectReport from "./SubjectReport";
import TimeManagement from "./TimeManagement";
import PreLoader from "../../Components/PreLoader";
export default function ViewResult() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { resultId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(examResult({ id: resultId }))
      .unwrap()
      .then(() => setLoading(false));
  }, [resultId]);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <>
      <FancyButton className="mb-3" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
        <span className="ps-2">Back</span>
      </FancyButton>
      <Wrapper>
        <Tabs defaultActiveKey="scoreCard" id="viewMyResult" className="mb-3">
          <Tab eventKey="scoreCard" title="SCORE CARD">
            <ScoreCard />
          </Tab>
          <Tab eventKey="subjectReport" title="SUBJECT REPORT">
            <SubjectReport />
          </Tab>
          <Tab eventKey="timeManagement" title="TIME MANAGEMENT">
            <TimeManagement />
          </Tab>
          <Tab eventKey="solution" title="SOLUTION">
            <Solution />
          </Tab>
        </Tabs>
      </Wrapper>
    </>
  );
}
