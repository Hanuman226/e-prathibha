import styled from "styled-components";
import answered from "../../Icons/answered.png";
import not_visited from "../../Icons/not_visited.png";
import review_answer from "../../Icons/review_answer.png";
import not_answered from "../../Icons/not_answered.png";
import review_question from "../../Icons/review.png";
import { useSelector } from "react-redux";

export default function QuestionFilter(props) {
  const payload = useSelector((state) => state.exam.examsData);
  if (!payload.exam.length) {
    return <h1>Loading...</h1>;
  }
  const { ExamStat } = payload.exam[0];
  let { option_selected, ques_no, bookmark, review } = ExamStat;

  console.log({ option_selected, ques_no, bookmark, review });
  return (
    <Wrapper>
      <p>Legend:</p>
      <Legend>
        <div>
          <div>
            <Button src={answered}>1</Button>
            <p>Answered</p>
          </div>
          <div>
            <Button src={not_answered}>2</Button>
            <p>Not Answered</p>
          </div>
        </div>
        <div>
          <div className="px-5">
            <Button src={review_question}>3</Button>
            <p>Marked</p>
          </div>
          <div className="px-5">
            <Button color="black" src={not_visited}>
              4
            </Button>
            <p>Not Visited</p>
          </div>
        </div>
        <div>
          <Button src={review_answer}>5</Button>
          <p>Answered & Marked For Review</p>
        </div>
      </Legend>
      <p>Filter:</p>
      <select
        className="form-select form-select-sm mb-3"
        aria-label=".form-select-sm example"
      >
        <option defaultValue>All</option>
        <option value="1">Answered</option>
        <option value="2">Not Answered</option>
        <option value="3">Marked</option>
        <option value="4">Not Visited</option>
        <option value="5">Answered & Marked For Review</option>
      </select>
    </Wrapper>
  );
}

const Wrapper = styled.div` & p {
  font-weight: bold;
  color: white;
`;

const Button = styled.button`
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
