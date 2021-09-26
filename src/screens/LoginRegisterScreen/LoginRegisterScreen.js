import React from "react";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FancyButton, Wrapper } from "../../Components/StyledComponents";
import Login from "./Login";
import Register from "./Register";

export default function LoginRegisterScreen() {
  const [activeKey, setActiveKey] = useState(0);
  const { action } = useParams();
  useEffect(() => {
    if (action === "login") {
      setActiveKey(0);
    } else if (action === "register") {
      setActiveKey(1);
    }
  }, [action]);

  return (
    <div className="d-flex h-100 justify-content-center align-items-center ">
      <StyledWrapper className="mt-4 d-flex flex-column  pt-3">
        <div className="d-flex justify-content-center mb-3">
          <FancyButton
            tab
            as={Link}
            to="/user/login"
            className="mx-md-5  mx-sm-1 w-100"
            active={activeKey === 0}
          >
            Login
          </FancyButton>
          <FancyButton
            tab
            as={Link}
            to="/user/register"
            className="mx-md-5  mx-sm-1  w-100"
            active={activeKey === 1}
          >
            Register
          </FancyButton>
        </div>
        {activeKey === 0 && <Login />}
        {activeKey === 1 && <Register />}
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled(Wrapper)`
  width: 768px;
  max-width: 80vw;
`;
