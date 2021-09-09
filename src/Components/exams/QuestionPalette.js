import styled from "styled-components";
import answered_question from "../../Icons/answered.png";
import not_visited from "../../Icons/not_visited.png";
import review_answer from "../../Icons/review_answer.png";
import not_answered from "../../Icons/not_answered.png";
import review_question from "../../Icons/review.png";
import bookmark_answer from "../../Icons/bookmark_answer.png";
import bookmark_question from "../../Icons/bookmark.png";
import { useSelector } from "react-redux";

export default function QuestionPalette(props) {
  const { setQues, length } = props;
  const payload = useSelector((state) => state.exam.examsData);
  if (!payload.exam.length) {
    return <h1>Loading...</h1>;
  }

  function buttonSrc(i) {
    let src = not_visited;
    const { ExamStat } = payload.exam[i];
    let { answered, bookmark, review } = ExamStat;
    if (bookmark && answered === "1") {
      src = bookmark_answer;
    } else if (review && answered === "1") {
      src = review_answer;
    } else if (bookmark && answered === "0") {
      src = bookmark_question;
    } else if (review && answered === "0") {
      src = review_question;
    } else if (answered === "1") {
      src = answered_question;
    } else {
      src = not_visited;
    }
    return src;
  }

  let buttons = [];

  for (var i = 1; i <= length; i++)
    buttons.push(
      <Button
        key={"quesNo" + i}
        color="black"
        value={i}
        onClick={(e) => setQues(e)}
        src={buttonSrc(i - 1)}
      >
        {i}
      </Button>
    );

  return (
    <Wrapper>
      <p>Question Palette :</p>
      {buttons.map((button) => button)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 15rem;
  overflow-y: scroll;
  background-color: lightblue;
  padding: 0.5rem;
  & p {
    font-weight: bold;
    color: white;
`;

const Button = styled.button`
  font-weight: bold;
  /* text-decoration: none; */
  white-space: nowrap;
  cursor: pointer;
  width: 2rem;
  padding-right: 0.1rem;
  height: 1.8rem;
  float: left;
  border: none;
  background: url(${(props) => props.src}) no-repeat center;
  color: ${(props) => (props.color ? props.color : "white")};
`;
