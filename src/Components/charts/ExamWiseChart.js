
import { useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

export default function ExamWiseChart(){
    const [options,setOptions]=useState({
          
        series: [{
            name: "Percentage",
            data: [20, 15, 1, 51, 4, 12]
        }],
        options: {
          chart: {
            height: 400,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Exam Wise Performance',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['practice_session_1', 'practice_session_2', '2018', '2017', '2016', '2014'],
            title: {
                text: 'Exams'
              }
          },
          yaxis:{
              title:{
                  text:"Percentage"
              }
          },
          markers: {
            size: 6,
            strokeWidth: 3,
            fillOpacity: 0,
            strokeOpacity: 0,
            hover: {
              size: 8
            }
          },
        },
      
      
      }
    );

    return(
<ChartWrapper>
    <Chart options={options.options} series={options.series} type="bar" height={400}/>    
</ChartWrapper>
    )
}


const ChartWrapper=styled.div`
 grid-column-end: span 3;
  padding: 0.625rem; 
  width:100%;
  border-radius: 0.625rem;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
  @media (max-width:786px){
    grid-column-end: span 1;
  }
  @media (max-width:991px) and (min-width:768px){
    grid-column-end: span 2;
  }
`