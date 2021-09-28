import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import styled from "styled-components";
import convertToHMS from "../../utils/convertToHMS";
export default function TimeManagementChart() {
  const { examResult } = useSelector((state) => state.exam);

  const { userMarksheet } = examResult;

  const time_taken_arr = userMarksheet
    .map((item, index) => {
      const { Subject } = Object.values(item)[0];
      return Number(Subject.time_taken);
    })
    .slice(0, -1);

  const subject_names_arr = userMarksheet
    .map((item, index) => {
      const { Subject } = Object.values(item)[0];
      return Subject.name;
    })
    .slice(0, -1);

  const series = time_taken_arr;
  const options = {
    chart: {
      width: "100%",
      type: "pie",
    },
    labels: subject_names_arr,
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    title: {
      text: `Subject Wise Time Taken`,
    },
    fill: {
      colors: ["#F44336", "#E91E63", "#9C27B0", "red", "yellow", "orange"],
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, convertToHMS(series[opts.seriesIndex])];
      },
    },
    legend: {
      show: true,
    },
  };

  return (
    <ChartWrapper shadow={true}>
      <Chart
        options={options}
        series={series}
        type="pie"
        height={400}
        width={"100%"}
      />
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
  @media (max-width: 991px) and (min-width: 768px) {
    grid-column-end: span 2;
  } */
`;
