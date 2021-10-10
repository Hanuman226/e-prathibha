import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPerformanceGraph } from "../../api/summaryThunk";
import { StyledScrollBar } from "../../Components/StyledComponents";
import PreLoader from "../../Components/PreLoader";
export default function PerformanceChart({ subjectId = "", difficulty = "" }) {
  const [loading, setLoading] = useState(true);
  const { exams = [], counts = [] } = useSelector(
    (state) => state.summary.performanceGraph
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPerformanceGraph({ subject: subjectId, diff: difficulty }))
      .unwrap()
      .then((res) => setLoading(false));
  }, [subjectId, difficulty]);

  if (loading) {
    return <PreLoader />;
  } else if (!exams.length) {
    return <h3>No Data Found</h3>;
  }

  const series = [
    {
      name: "Correct %",
      data: counts,
      type: "line",
    },
  ];

  const options = {
    chart: {
      height: 400,
      width: "100%",
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
      text: "Subject Wise Performance",
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
      title: {
        text: "Exams",
      },
    },
    yaxis: [
      {
        labels: {
          formatter: function (value) {
            return parseInt(value, 10);
          },
        },
        title: {
          text: "Correct %",
        },
        forceNiceScale: true,
        min: 0,
        max: 100,
        tickAmount: 9,
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
      showForSingleSeries: true,
      //   offsetY: 50,
      itemMargin: {
        vertical: 20,
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toFixed(2) + "%";
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
  min-width: 90vw;
  padding: 0.625rem;
  border-radius: 0.625rem;
  overflow-x: scroll;
`;
