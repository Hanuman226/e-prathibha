import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import logo from "../Icons/logo.png";
import { Dropdown } from "react-bootstrap";
import UserDropDown from "../screens/UserProfileScreen/UserDropDown";
export default function Header() {
  return (
    <>
      <Wrapper>
        <Logo src={logo} alt="brand-logo" />

        <Dropdown className="me-4">
          <Dropdown.Toggle
            variant="danger"
            id="dropdown-basic"
            className="shadow-none"
          >
            <FontAwesomeIcon icon={["fas", "user"]} />
          </Dropdown.Toggle>

          <Dropdown.Menu className=" shadow shadow-lg bg-white">
            <UserDropDown />
          </Dropdown.Menu>
        </Dropdown>
      </Wrapper>
    </>
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
