import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <Wrapper>
      <Icons>
        <IconWrapper>
          <NavLink exact to="/">
            <FontAwesomeIcon icon={["fas", "home"]} />
            <span>Dashboard</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/buy-packages">
            <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
            <span>Buy Packages</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/my-result">
            <FontAwesomeIcon icon={["fas", "trophy"]} />
            <span>My Result</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/summary">
            <FontAwesomeIcon icon={["fas", "chart-bar"]} />
            <span>Summary</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/all_bookmarks">
            <FontAwesomeIcon icon={["fas", "bookmark"]} />
            <span>All Bookmarks</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/incorrect_questions">
            <FontAwesomeIcon icon={["fas", "times-circle"]} />
            <span>Incorrect Questions</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/search">
            <FontAwesomeIcon icon={["fas", "search"]} />
            <span>Search</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/over-all-report">
            <FontAwesomeIcon icon={["fas", "compass"]} />
            <span>Over All Report</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/payment">
            <FontAwesomeIcon icon={["fas", "credit-card"]} />
            <span>Payment</span>
          </NavLink>
        </IconWrapper>
        <IconWrapper>
          <NavLink to="/help">
            <FontAwesomeIcon icon={["fas", "question-circle"]} />
            <span>Help</span>
          </NavLink>
        </IconWrapper>
      </Icons>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 2.5rem;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Icons = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  color: white;
  padding-left: 0;
`;

const IconWrapper = styled.li`
  cursor: pointer;
  & a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    white-space: nowrap;
    height: 2.5rem;
    width: 2.5rem;
    transition: all ease-out 120ms;
    &:hover {
      background-color: #313443;
    }
    &:hover span {
      visibility: visible;
      opacity: 1;
    }
  }

  & a.active {
    background-color: #313443;
  }
  & a span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 2.5rem;
    background-color: black;
    height: 2.5rem;
    width: 9rem;
    visibility: hidden;
    opacity: 0;
  }
`;
