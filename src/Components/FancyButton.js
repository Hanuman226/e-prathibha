import styled from "styled-components";

export default function FancyButton(props) {
  const { children, disabled } = props;
  return (
    <Button disabled={disabled} onClick={props.onClick}>
      {" "}
      {children}
    </Button>
  );
}

const Button = styled.button`
  height: 2.5rem;
  width: 6.25rem;
  border-radius: 0.625rem;
  border: none;
  text-transform: uppercase;
  padding: 0.625rem;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${(props) => (props.disabled ? "gray" : "black")};
  color: white;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%)"};
  outline: none;
  transition: all 0.3s;
  &:active {
    box-shadow: none;
  }
`;
