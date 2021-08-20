import React from 'react'
import styled from 'styled-components';
import FreeCard from "../components/cards/FreeCard";
import PremiumCard from "../components/cards/PremiumCard";
import PracticeCard from "../components/cards/PracticeCard";
import UtilCards from "../components/cards/UtilCards";
import data from "../data";
import ExamStats from "../components/ExamStats";
import MonthWiseChart from "../components/charts/MonthWiseChart";
import ExamWiseChart from "../components/charts/ExamWiseChart";
export default function HomeScreen() {
    return (
        <Wrapper>
          <FreeCard progress={50} />
          <PremiumCard progress={75} expiryDate="20/10/2021" />
          <PracticeCard />
          <UtilCards data={{...data[0].utilCard1}}/>
          <UtilCards data={{...data[1].utilCard2}}/>
          <UtilCards data={{...data[2].utilCard3}}/>
          <ExamStats/>
          <MonthWiseChart/>
          <ExamWiseChart/>
        </Wrapper>
    )
}


const Wrapper=styled.div`
display: grid;
  gap: 2rem;
  /* grid-auto-flow:dense; */
  grid-template-columns: repeat(auto-fill,minmax(40rem, 1fr));
`