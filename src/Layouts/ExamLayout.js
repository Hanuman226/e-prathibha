import React from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect } from "react";
export default function ExamLayout({ children }) {
  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = "hello";
      // return "exit";
    };
    window.addEventListener("beforeunload", confirmExit);
    return () => window.removeEventListener("beforeunload", confirmExit);
  }, []);
  return (
    <Container>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-areas: "nav" "main-content" "footer";
  grid-template-columns: 1fr;
  grid-template-rows: 3.75rem auto 3.125rem;
  height: 100%;
  /* overflow-x: hidden; */
`;

const MainContent = styled.main`
  grid-area: main-content;
  /* background-color: lightgray; */
  padding: 2vw;
  /* overflow-x: hidden; */
`;
