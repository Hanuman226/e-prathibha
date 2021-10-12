import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Container>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 768px;
  margin: 0 auto;
`;
