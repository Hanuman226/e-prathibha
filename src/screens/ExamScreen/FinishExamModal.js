import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import answered from "../../Icons/answered.png";
import not_visited from "../../Icons/not_visited.png";
import review_answer from "../../Icons/review_answer.png";
import not_answered from "../../Icons/not_answered.png";
import review_question from "../../Icons/review.png";
import bookmark from "../../Icons/bookmark.png";
import { finishExam } from "../../api/examThunk";
import { FancyButton } from "../../Components/StyledComponents";
import { useHistory } from "react-router";
export default function FinishExamModal(props) {
  const { show, toggle, setQues, examId, qno, resultId } = props;
  const submitData = useSelector((state) => state.exam.submitExam);
  const dispatch = useDispatch();
  // const history = useHistory();
  const handleFinishExam = () => {
    dispatch(finishExam({ examId, qno }));
    toggle();
    // history.push(`/exam_result/${resultId}`);
  };
  return (
    <Modal show={show} onHide={toggle} centered>
      <Modal.Header closeButton>
        <Modal.Title>Finalize Exam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Do you wish to submit and close the exam ? Once you submit, you will
          not be able to review the exam.
        </p>
        <p>Summary of your attempts in this exam as shown below</p>
        <Legend>
          <div>
            <div>
              <LegendButton src={answered}>{submitData[2]}</LegendButton>
              <p>Answered</p>
            </div>
            <div>
              <LegendButton src={not_answered}>{submitData[3]}</LegendButton>
              <p>Not Answered</p>
            </div>
          </div>
          <div>
            <div className="px-5">
              <LegendButton src={review_question}>{submitData[4]}</LegendButton>
              <p>Marked</p>
            </div>
            <div className="px-5">
              <LegendButton src={review_answer}>{submitData[5]}</LegendButton>
              <p>Answered & Marked For Review</p>
            </div>
          </div>
          <div>
            <div>
              <LegendButton color="black" src={not_visited}>
                {submitData[6]}
              </LegendButton>
              <p>Not Visited</p>
            </div>
            <div>
              <LegendButton src={bookmark}>{submitData[7]}</LegendButton>
              <p>Bookmarked</p>
            </div>
          </div>
        </Legend>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <FancyButton as={Link} to={`/form`} onClick={handleFinishExam}>
          <FontAwesomeIcon icon={["fas", "lock"]} />
          <span className="ps-2">Finish Exam</span>
        </FancyButton>
        <FancyButton
          value={1}
          onClick={(e) => {
            setQues(e);
            toggle();
          }}
        >
          <FontAwesomeIcon
            icon={["fas", "arrow-left"]}
            size="2x"
            className="pe-2"
          />
          Return To First Question
        </FancyButton>
        <Button
          variant="secondary"
          className="d-flex  justify-content-center align-items-center"
          onClick={toggle}
        >
          <FontAwesomeIcon icon={["fas", "times"]} />
          <span className="ps-2">Cancel</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  & div {
    & p {
      white-space: nowrap;
      font-weight: normal;
    }
  }
`;

const LegendButton = styled.button`
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  width: 2rem;
  padding-right: 0.1rem;
  height: 1.8rem;
  float: left;
  border: none;
  background: url(${(props) => props.src}) no-repeat center;
  color: ${(props) => (props.color ? props.color : "white")};
  margin-right: 0.5rem;
`;
