import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function GraphicalReportChart() {
  const { examResult } = useSelector((state) => state.exam);

  const { userMarksheet } = examResult;

  const {
    examDetails: { Exam },
  } = examResult;

  const total_marks_arr = userMarksheet
    .map((item, index) => {
      const { Subject } = Object.values(item)[0];
      return Number(Subject.total_marks);
    })
    .slice(0, -1);

  const obtained_marks_arr = userMarksheet
    .map((item, index) => {
      const { Subject } = Object.values(item)[0];
      return Number(Subject.obtained_marks);
    })
    .slice(0, -1);

  const xaxis_categories_arr = userMarksheet
    .map((item, index) => {
      const {
        Subject: { name },
      } = Object.values(item)[0];
      return name;
    })
    .slice(0, -1);

  const series = [
    {
      name: "total marks",
      data: total_marks_arr,
    },
    {
      name: "obtained marks",
      data: obtained_marks_arr,
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
        columnWidth: "50%",
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
      text: `Graphical Report For ${Exam.name}`,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: xaxis_categories_arr,
      tickAmount: 5,
      // tickPlacement: "on",
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
  padding: 0.625rem;
  width: 100%;
  border-radius: 0.625rem;
  margin-top: 2rem;
  box-shadow: ${(props) =>
    props.shadow ? "0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%)" : "none"};
`;
