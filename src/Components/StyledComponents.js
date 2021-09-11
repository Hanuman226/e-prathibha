import styled from "styled-components";

export const styledScrollBar = styled.div`
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
`;

export const HorizontalBreak = styled.hr`
  height: 1.5px;
  background-color: silver;
`;
