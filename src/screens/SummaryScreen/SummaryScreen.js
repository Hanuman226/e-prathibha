import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getPerformanceGraph,
  getSubjects,
  getSummaryGraph,
  getTimeGraph,
} from "../../api/summaryThunk";
// import { Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import { Wrapper, FancyButton } from "../../Components/StyledComponents";
import TimeManangementChart from "./TimeManagementChart";
export default function SummaryScreen() {
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.summary.subjects);
  useEffect(() => {
    dispatch(getSubjects());
    dispatch(getTimeGraph({ subject: 20 }));
    dispatch(getSummaryGraph({ subject: "" }));
    dispatch(getPerformanceGraph({ subject: "", diff: "" }));
  }, []);

  return (
    <>
      <Wrapper>
        <div className="d-flex justify-content-center">
          <FancyButton
            tab
            className="mx-2"
            active={key === 0}
            onClick={() => setKey(0)}
          >
            Time Manangement
          </FancyButton>
          <FancyButton
            tab
            className="mx-2"
            active={key === 1}
            onClick={() => setKey(1)}
          >
            Progress Summary
          </FancyButton>
          <FancyButton
            tab
            className="mx-2"
            active={key === 2}
            onClick={() => setKey(2)}
          >
            performance
          </FancyButton>
        </div>
        <div className=" row mt-3  justify-content-center">
          <fieldset className="col-sm-6 mb-3 d-flex  align-items-center">
            <label htmlFor="subjects" className="fw-bold">
              Subject:{" "}
            </label>
            <select
              id="subjects"
              className="form-select mx-3 "
              aria-label="choose subject"
            >
              <option value="all">All</option>
              {Object.entries(subjects).map((subject) => (
                <option value={subject[0]}>{subject[1]}</option>
              ))}
            </select>
            <FancyButton className="mx-2">
              <FontAwesomeIcon icon={["fas", "plus"]} className="me-2" />
              submit
            </FancyButton>
          </fieldset>
        </div>
      </Wrapper>
      <Wrapper className="mt-5 d-flex justify-content-center">
        {key === 0 && <TimeManangementChart />}
        {key === 1 && <div style={{ height: "400px" }}>tab2</div>}
        {key === 2 && <div style={{ height: "400px" }}>tab3</div>}
      </Wrapper>
    </>
  );
}
