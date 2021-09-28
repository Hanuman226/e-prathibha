import Chart from "react-apexcharts";
import styled from "styled-components";
import { useSelector } from "react-redux";
export default function BarGraph() {
  const { overAllReport } = useSelector((state) => state.overAllReport);

  const {
    barGraph: { total_marks, my_marks },
  } = overAllReport;

  const series = [
    {
      name: "Score",
      data: [Number(total_marks), Number(my_marks)],
    },
  ];

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
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: `Performance Report `,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["Max Marks", "Marks Scored"],
      title: {
        text: "Student Performance",
      },
    },
    yaxis: {
      title: {
        text: "Score",
      },
    },
  };

  return (
    <ChartWrapper shadow={true}>
      <Chart options={options} series={series} type="bar" height={400} />
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  /* grid-column-end: span 3; */
  padding: 0.625rem;
  width: 100%;
  border-radius: 0.625rem;
  box-shadow: ${(props) =>
    props.shadow ? "0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%)" : "none"};
  /* @media (max-width: 786px) {
    grid-column-end: span 1;
  }
  */
  @media (max-width: 991px) {
    margin-bottom: 2rem;
  }
`;
