import styled from "styled-components";
import answered_question from "../../Icons/answered.png";
import not_visited from "../../Icons/not_visited.png";
import review_answer from "../../Icons/review_answer.png";
import not_answered from "../../Icons/not_answered.png";
import review_question from "../../Icons/review.png";
import bookmark_answer from "../../Icons/bookmark_answer.png";
import bookmark_question from "../../Icons/bookmark.png";
import { useDispatch, useSelector } from "react-redux";
import { styledScrollBar } from "../../Components/StyledComponents";
import { questionOpened } from "../../api/examSlice";
export default function QuestionPalette(props) {
  const { setQues, filterOption } = props;
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.exam.examsData);
  if (!payload.exam.length) {
    return <h1>Loading...</h1>;
  }
  console.log({ filterOption });
  const handleClick = (e) => {
    setQues(e);
    filterOption !== "not_visited" &&
      dispatch(questionOpened({ qId: e.target.value }));
  };

  function buttonSrc(i) {
    let src;
    const { ExamStat } = payload.exam[i];
    let { answered, bookmark, review, opened } = ExamStat;
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
    } else if (opened === true) {
      src = not_answered;
    } else {
      src = not_visited;
    }
    return src;
  }

  let buttons = [];
  const noOfQuestions = payload.exam.length;
  for (var i = 1; i <= noOfQuestions; i++) {
    const { ExamStat } = payload.exam[i - 1];
    let { answered, review, opened, bookmark } = ExamStat;
    buttons.push(
      <Button
        key={"quesNo" + i}
        color="black"
        value={i}
        onClick={handleClick}
        src={buttonSrc(i - 1)}
        filterOption={filterOption}
        answered={answered}
        review={review}
        opened={opened}
        bookmark={bookmark}
      >
        {i}
      </Button>
    );
  }

  return (
    <Wrapper>
      <p>Question Palette :</p>
      {buttons.map((button) => button)}
    </Wrapper>
  );
}

const Wrapper = styled(styledScrollBar)`
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
  white-space: nowrap;
  cursor: pointer;
  width: 2rem;
  padding-right: 0.1rem;
  height: 1.8rem;
  float: left;
  border: none;
  background: url(${(props) => props.src}) no-repeat center;
  color: ${(props) => (props.color ? props.color : "white")};
  visibility: ${({ filterOption, answered, review, opened, bookmark }) =>
    filterOption === "all"
      ? "visible"
      : filterOption === "answered" && answered === "1" && !review && !bookmark
      ? "visible"
      : filterOption === "marked" && answered === "0" && (review || bookmark)
      ? "visible"
      : filterOption === "mark_answer" &&
        answered === "1" &&
        (review || bookmark)
      ? "visible"
      : filterOption === "not_answered" &&
        opened === true &&
        !review &&
        answered === "0" &&
        !bookmark
      ? "visible"
      : filterOption === "not_visited" &&
        !review &&
        opened === "0" &&
        answered === "0" &&
        !bookmark
      ? "visible"
      : "hidden"};
`;
