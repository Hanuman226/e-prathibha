import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StyledScrollBar } from "../../Components/StyledComponents";

export default function TimeManagementChart() {
  const {
    time = [1, 2],
    avg = [],
    exams = {},
  } = useSelector((state) => state.summary.timeGraph);
  // if (time.length) {
  //   return <h3>Loading...</h3>;
  // }
  // const avgTime =
  //   time.map((num) => Number(num)).reduce((a, b) => a + b) / time.length;
  const avgTime = 72;
  const series = [
    {
      name: "Average Difficulty Level",
      data: avg,
      type: "line",
    },
    {
      name: "Average Time Taken",
      data: time.map((a) => Number(a)),
      type: "line",
    },
    {
      name: `Average Time for each question (${parseInt(avgTime, 10)} sec)`,
      data: new Array(time.length).fill(avgTime),
      type: "line",
    },
    10,
  ];

  const options = {
    chart: {
      height: 400,
      // width: 2000,
      type: "line",
      stacked: false,
      zoom: {
        enabled: false,
        type: "x",
      },
    },
    dataLabels: {
      enabled: false,
      // formatter: undefined,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Exam Wise Performance",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: exams,
      // title: {
      //   text: "Month",
      // },
    },
    yaxis: [
      {
        labels: {
          formatter: function (value) {
            return parseInt(value, 10);
          },
        },
        seriesName: "Average Difficulty Level",
        opposite: true,
        title: {
          text: "Average Difficulty Level",
        },
      },
      {
        labels: {
          formatter: function (value) {
            return parseInt(value, 10);
          },
        },
        min: 0,
        max: 120,
        tickAmount: 2,
        seriesName: "Average Time Taken",
        title: {
          text: "Average Time Taken",
        },
      },
      {
        labels: {
          formatter: function (value) {
            return parseInt(value, 10);
          },
        },
        min: 0,
        max: 120,
        tickAmount: 2,
        show: false,
        seriesName: "Average Time Taken",
        title: {
          text: "Average Time Taken",
        },
      },
    ],
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8,
      },
    },
    legend: {
      show: true,
      offsetY: 50,
      itemMargin: {
        vertical: 50,
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value;
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <Chart
        options={options}
        series={series}
        type="line"
        height={500}
        width={10000}
      />
    </ChartWrapper>
  );
}

const ChartWrapper = styled(StyledScrollBar)`
  width: 90vw;
  padding: 0.625rem;
  border-radius: 0.625rem;
  overflow-x: scroll;
`;
