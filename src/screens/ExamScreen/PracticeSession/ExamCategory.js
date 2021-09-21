import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FancyButton } from "../../../Components/StyledComponents";
export default function ExamCategory() {
  const { packageId } = useParams();
  const history = useHistory();
  return (
    <Container fluid className="text-muted text-center">
      <FancyButton className="mb-2" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
        <span className="ps-2">Back</span>
      </FancyButton>
      <h2 className="text-dark text-uppercase">
        {Number(packageId) === 7 ? "Free" : "Premium"}
      </h2>
      <p className="my-4 fs-4">Please select the Category</p>
      <section className="text-muted d-flex justify-content-center flex-wrap ">
        <StyledLink as={Link} to={`/practice_session/${packageId}/ncert`}>
          Ncert
        </StyledLink>
        <StyledLink as={Link} to={`/practice_session/${packageId}/upsc`}>
          upsc civil services(pre)
        </StyledLink>
        <StyledLink as={Link} to={`/practice_session/${packageId}/other`}>
          other upsc
        </StyledLink>
      </section>
    </Container>
  );
}

const StyledLink = styled.a`
  padding: 1.25rem;
  margin: 0.5rem;
  border-radius: 0.3rem;
  width: 20rem;
  text-transform: uppercase;
  font-size: 1.2rem;
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
