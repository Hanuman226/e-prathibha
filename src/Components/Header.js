import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import logo from "../Icons/logo.png";
export default function Header() {
  return (
    <Wrapper>
      <Logo src={logo} alt="brand-logo" />
      <Profile>
        <FontAwesomeIcon icon={["fas", "user"]}  />
        <FontAwesomeIcon icon={["fas", "caret-down"]}  />
      </Profile>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  grid-area: nav;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  color: white;
  padding: 0 2rem;
`;

const Logo = styled.img`
  height: 5rem;
  width: 17.5rem;
`;

const Profile = styled.div`
font-size: 2rem;
cursor: pointer;
/* padding-right: 3rem; */
`;
