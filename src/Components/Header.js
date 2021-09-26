import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import styled from "styled-components";
import logo from "../Icons/logo.png";
import auth from "../utils/auth";
import { FancyButton } from "./StyledComponents";
export default function Header() {
  const history = useHistory();
  return (
    <Wrapper>
      <Logo src={logo} alt="brand-logo" />
      {/* <Profile>
        <FontAwesomeIcon icon={["fas", "user"]} />
        <FontAwesomeIcon icon={["fas", "caret-down"]} />
      </Profile> */}
      <FancyButton
        bgColor="red"
        onClick={() => {
          auth.logout(() => {
            return history.push("/user/login");
          });
        }}
      >
        Logout
      </FancyButton>
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
  padding: 0 0.625rem;
`;

const Logo = styled.img`
  height: 3.125rem;
  width: 10.9375rem;
`;

const Profile = styled.div`
  font-size: 1.25rem;
  cursor: pointer;
  /* padding-right: 3rem; */
`;
