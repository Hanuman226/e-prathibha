import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrapper>
      <h4>E-Prathibha-Logo</h4>
      <h4>
        <FontAwesomeIcon icon={["fas", "user"]} />
        Account
      </h4>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: black;
  color: white;
  padding: 1rem;
`;
