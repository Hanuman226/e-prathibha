import React from "react";
import styled from "styled-components";
import FreeCard from "../Components/cards/FreeCard";
import PremiumCard from "../Components/cards/PremiumCard";
import PracticeCard from "../Components/cards/PracticeCard";
import UtilCards from "../Components/cards/UtilCards";
import data from "../data";
import ExamStats from "../Components/ExamStats";
import MonthWiseChart from "../Components/charts/MonthWiseChart";
import ExamWiseChart from "../Components/charts/ExamWiseChart";
export default function HomeScreen() {
  return (
    <Wrapper>
      <FreeCard progress={50} />
      <PremiumCard progress={75} expiryDate="20/10/2021" />
      <PracticeCard />
      <UtilCards data={{ ...data.cards.bookmarkCard }} />
      <UtilCards data={{ ...data.cards.incorrectQuestionCard }} />
      <UtilCards data={{ ...data.cards.summaryCard }} />
      <ExamStats />
      <MonthWiseChart />
      <ExamWiseChart />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-items:center;
  gap: 1.25rem;
  grid-auto-flow:dense;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  @media (max-width:1024px){
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }
`;
