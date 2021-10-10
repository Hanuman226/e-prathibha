import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTimeGraph } from "../../api/summaryThunk";
import { StyledScrollBar } from "../../Components/StyledComponents";
import PreLoader from "../../Components/PreLoader";

export default function TimeManagementChart({ subjectId = "" }) {
  const [loading, setLoading] = useState(true);
  const {
    time = [],
    avg = [],
    exams = {},
  } = useSelector((state) => state.summary.timeGraph);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeGraph({ subject: subjectId }))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, [subjectId]);

  if (loading) {
    return <PreLoader />;
  } else if (!time.length) {
    return <h3>No Data Found</h3>;
  }
  const series = [
    {
      name: "Average Difficulty Level",
      data: avg,
      type: "line",
    },
    {
      name: "Average Time Taken (sec)",
      data: time.map((a) => Number(a)),
      type: "line",
    },
    {
      name: `Average Time for each question (1 min 12 sec)`,
      data: new Array(time.length).fill(72),
      type: "line",
    },
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
      labels: {
        rotate: -45,
        rotateAlways: true,
      },
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
        // max: 120,
        tickAmount: 2,
        seriesName: "Average Time Taken",
        title: {
          text: "Average Time Taken (sec)",
        },
      },
      {
        labels: {
          formatter: function (value) {
            return parseInt(value, 10);
          },
        },
        min: 0,
        // max: 120,
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
      offsetY: 20,
      itemMargin: {
        vertical: 20,
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
    },
  };

  const graphWidth = exams.length < 15 ? "100%" : exams.length * 100;

  return (
    <ChartWrapper>
      <Chart
        options={options}
        series={series}
        type="line"
        height={400}
        width={graphWidth}
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
