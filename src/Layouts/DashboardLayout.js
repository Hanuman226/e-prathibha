import React from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <Container>
      <Sidebar />
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-areas: ". nav" ". main-content" ". footer";
  grid-template-columns: 2.5rem 1fr;
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
