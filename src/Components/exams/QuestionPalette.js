import styled from "styled-components";
import answered from "../../Icons/answered.png";
export default function QuestionPalette() {
  return (
    <Wrapper>
      <p>Question Palette :</p>
      <Button src={answered}>3</Button>
      <Button src={answered} value="3" />
      <Button src={answered} value="3" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 10rem;
  background-color: blue;
  padding: 0.5rem;
  & p {
    font-weight: bold;
    color: white;
  }
`;

const Button = styled.button`
  display: block;
  line-height: 1.35em;
  text-decoration: none;
  white-space: nowrap;
  display: inline;
  margin-left: 6px;
  margin-top: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 32px;
  height: 26px;
  float: left;
  padding-left: 4px;
  border: none;
  background: url(${(props) => props.src}) no-repeat;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
