import styled from "styled-components"

export default function FancyButton(props) {
  const {children}=props;
    return (
        <Button onClick={props.onClick}> {children}</Button>
    )
}


const Button=styled.button`
  height: 2.5rem;
    width: 6.25rem;
    border-radius: 0.625rem;
    border: none;
    text-transform: uppercase;
    padding: 0.625rem;
    font-size: 0.75rem;
    font-weight: bold;
    background-color: black;
    color: white;
    cursor: pointer;
    box-shadow: 0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%);
    outline: none;
  

  &:active {
    box-shadow: none;
  }
`;


