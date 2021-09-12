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
import { attemptTime } from "../../api/examThunk";
export default function QuestionPalette(props) {
  const { setQues, filterOption, examId } = props;
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.exam.examsData);
  if (!payload.exam.length) {
    return <h1>Loading...</h1>;
  }
  const handleClick = (e) => {
    setQues(e);
    filterOption !== "not_visited" &&
      dispatch(questionOpened({ qId: e.target.value }));
    dispatch(
      attemptTime({
        examId: examId,
        qId: e.target.value,
        currQues: e.target.value,
      })
    );
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
    } else if (opened === "1") {
      src = not_answered;
    } else {
      src = not_visited;
    }
    return src;
  }

  return (
    <Wrapper>
      <p>Question Palette :</p>
      {payload.exam.map((item, index) => {
        const { answered, review, opened, bookmark, ques_no } = item.ExamStat;
        return (
          <Button
            key={"quesNo" + index}
            value={ques_no}
            onClick={handleClick}
            src={buttonSrc(index)}
            filterOption={filterOption}
            answered={answered}
            review={review}
            opened={opened}
            bookmark={bookmark}
          >
            {ques_no}
          </Button>
        );
      })}
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
  color: ${({ answered, review, opened, bookmark }) =>
    !review && opened === "0" && answered === "0" && !bookmark
      ? "black"
      : "white"};
  /* visibility: ${({ filterOption, answered, review, opened, bookmark }) =>
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
      : "hidden"}; */
  display: ${({ filterOption, answered, review, opened, bookmark }) =>
    filterOption === "all"
      ? "block"
      : filterOption === "answered" && answered === "1" && !review && !bookmark
      ? "block"
      : filterOption === "marked" && answered === "0" && (review || bookmark)
      ? "block"
      : filterOption === "mark_answer" &&
        answered === "1" &&
        (review || bookmark)
      ? "block"
      : filterOption === "not_answered" &&
        opened === "1" &&
        !review &&
        answered === "0" &&
        !bookmark
      ? "block"
      : filterOption === "not_visited" &&
        !review &&
        opened === "0" &&
        answered === "0" &&
        !bookmark
      ? "block"
      : "none"};
`;
