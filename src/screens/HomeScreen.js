import React from 'react'
import styled from 'styled-components';
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