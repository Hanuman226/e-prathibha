
import { useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

export default function MonthWiseChart(){
    const [options,setOptions]=useState({
          
        series: [{
            name: "Percentage",
            data: [10, 41, 35, 51, 49, 62]
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
            text: 'Month Wise Performance',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            title: {
                text: 'Month'
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
    <Chart options={options.options} series={options.series} type="line" height={400}/>    
</ChartWrapper>
    )
}


const ChartWrapper=styled.div`
 grid-column-end: span 2;
 width:100%;
  padding: 0.625rem; 
  border-radius: 0.625rem;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
  @media (max-width:991px){
    grid-column-end: span 1;
  }
`