import React from "react";
import { Card } from "react-bootstrap";
import { Wrapper } from "../../Components/StyledComponents";

export default function HelpScreen() {
  return (
    <Wrapper>
      <h3 className="mb-3">Help</h3>
      <Card>
        <Card.Header>Help 1</Card.Header>
        <Card.Body>
          <a
            href="mailto:info@e-prathibha.com"
            className="text-decoration-none fw-bold"
          >
            info@e-prathibha.com
          </a>
        </Card.Body>
      </Card>
    </Wrapper>
  );
}
