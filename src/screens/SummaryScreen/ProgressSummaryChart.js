import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSummaryGraph } from "../../api/summaryThunk";
import { StyledScrollBar } from "../../Components/StyledComponents";
import PreLoader from "../../Components/PreLoader";

export default function ProgressSummaryChart({ subjectId = "" }) {
  const [loading, setLoading] = useState(true);
  const summaryGraph = useSelector((state) => state.summary.summaryGraph);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSummaryGraph({ subject: subjectId }))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, [subjectId]);

  if (loading) {
    return <PreLoader />;
  } else if (!summaryGraph[0].length) {
    return <h3>No Data Found</h3>;
  }

  const series = [
    {
      name: "Average Difficulty Level",
      data: summaryGraph[2],
      type: "line",
    },
    {
      name: "Correct %",
      data: summaryGraph[0],
      type: "line",
    },
  ];

  const options = {
    chart: {
      height: 400,
      type: "line",
      stacked: false,
      zoom: {
        enabled: false,
        type: "x",
      },
    },
    dataLabels: {
      enabled: false,
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
      categories: summaryGraph[1],
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
        seriesName: "Correct %",
        title: {
          text: "Correct %",
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

  const graphWidth =
    summaryGraph[1].length < 15 ? "100%" : summaryGraph[1].length * 100;

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
