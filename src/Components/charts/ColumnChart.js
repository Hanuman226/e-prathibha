import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

export default function ColumnChart(props) {
  const { shadow = false, chartData } = props;
  const [series, setSeries] = useState([
    {
      name: "Percentage",
      data: [20, 15, 1, 51, 4, 12],
    },
  ]);
  const options = {
    chart: {
      height: 400,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Exam Performance",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Max Questions", "Right Questions"],
      title: {
        text: "Exam Performance",
      },
    },
    yaxis: {
      title: {
        text: "Question Count",
      },
    },
  };

  useEffect(() => {
    setSeries([
      {
        name: "Question Count",
        data: chartData,
      },
    ]);
  }, []);
  return (
    <ChartWrapper shadow={shadow}>
      <Chart options={options} series={series} type="bar" height={400} />
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  grid-column-end: span 3;
  padding: 0.625rem;
  width: 100%;
  border-radius: 0.625rem;
  box-shadow: ${(props) =>
    props.shadow ? "0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%)" : "none"};
  @media (max-width: 786px) {
    grid-column-end: span 1;
  }
  @media (max-width: 991px) and (min-width: 768px) {
    grid-column-end: span 2;
  }
`;
