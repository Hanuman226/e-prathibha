import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
export default function PracticeSession() {
  return (
    <Container fluid className="text-muted text-center">
      <h2 className="text-dark text-uppercase">Practice Exams</h2>
      <p className="my-4 fs-4">Please select the package</p>
      <section className="text-muted d-flex justify-content-center flex-wrap gap-3">
        <StyledLink as={Link} to="/practice_session/7">
          Free
        </StyledLink>
        <StyledLink as={Link} to="/practice_session/8">
          Premium
        </StyledLink>
      </section>
    </Container>
  );
}

const StyledLink = styled.a`
  padding: 1.25rem;
  margin: 0 0.5rem;
  border-radius: 0.3rem;
  width: 20rem;
  text-transform: uppercase;
  font-size: 1.3rem;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
  &:active {
    box-shadow: none;
  }
`;
