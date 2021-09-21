import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0.625rem;
  border-radius: 0.625rem;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 12%);
  /* width: 20vw; */
`;

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 90vw;
  margin: 0 auto;
`;

export const FancyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  border-radius: 0.625rem;
  border: none;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.625rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.disabled ? "gray" : "black")};
  background-color: ${(props) => (props.tab ? "white" : "")};
  background-color: ${(props) => (props.active ? "black" : "")};
  color: ${(props) => (props.tab ? "black" : "")};
  border: ${(props) => (props.tab ? "solid 0.5px black" : "")};
  color: ${(props) => (props.active ? "white" : "")};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%)"};
  outline: none;
  transition: all 0.3s;
  &:active {
    box-shadow: none;
  }
  &:hover {
    background-color: ${(props) => (props.tab ? "black" : "")};
    color: ${(props) => (props.tab ? "white" : "")};
  }
`;

export const StyledScrollBar = styled.div`
  &::-webkit-scrollbar {
    width: 10px;
    height: 15px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    box-shadow: inset 0 0 2px grey;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: hsl(0deg 0% 10% / 20%);
    border-radius: 0.3rem;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: hsl(0deg 0% 10% / 40%);
  }
`;

export const StyledSelect = styled.select`
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    box-shadow: inset 0 0 2px grey;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: hsl(0deg 0% 10% / 20%);
    border-radius: 0.3rem;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: hsl(0deg 0% 10% / 40%);
  }

  &:focus {
    box-shadow: none;
  }
`;

export const HorizontalBreak = styled.hr`
  height: 1.5px;
  background-color: silver;
`;
