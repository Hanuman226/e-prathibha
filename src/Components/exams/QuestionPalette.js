import styled from "styled-components";
import answered from "../../Icons/answered.png";
import not_visited from "../../Icons/not_visited.png";
import review_answer from "../../Icons/review_answer.png";
import not_answered from "../../Icons/not_answered.png";
import review from "../../Icons/review.png";
import bookmark_answer from "../../Icons/bookmark_answer.png";
import bookmark from "../../Icons/bookmark.png";

export default function QuestionPalette() {
  return (
    <Wrapper>
      <p>Question Palette :</p>
      <Button color="black" defaultSrc={not_visited} src={not_visited}>
        1
      </Button>
      <Button defaultSrc={not_visited} src={answered}>
        2
      </Button>
      <Button defaultSrc={not_visited} src={not_answered}>
        3
      </Button>
      <Button defaultSrc={not_visited} src={review}>
        4
      </Button>
      <Button defaultSrc={not_visited} src={review_answer}>
        5
      </Button>
      <Button defaultSrc={not_visited} src={bookmark}>
        6
      </Button>
      <Button defaultSrc={not_visited} src={bookmark_answer}>
        7
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 10rem;
  background-color: lightblue;
  padding: 0.5rem;
  & p {
    font-weight: bold;
    color: white;
  }
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
  background: url(${(props) => (props.src ? props.src : props.defaultSrc)})
    no-repeat center;
  color: ${(props) => (props.color ? props.color : "white")};
`;
