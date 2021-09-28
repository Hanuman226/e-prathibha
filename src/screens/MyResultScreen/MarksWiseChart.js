import Chart from "react-apexcharts";
import styled from "styled-components";
import { useSelector } from "react-redux";
export default function MarksWiseChart() {
  const {
    examDetails: { Exam },
    correctQuestion,
    incorrectQuestion,
    rightMarksArr: {
      ExamStat: { total_marks: rightMarks },
    },
    negativeMarksArr: {
      ExamStat: { total_marks: negativeMarks },
    },
  } = useSelector((state) => state.exam.examResult);

  const series = [
    Number(correctQuestion),
    Number(incorrectQuestion),
    Number(rightMarks),
    Math.abs(negativeMarks),
  ];
  const options = {
    chart: {
      width: "100%",
      type: "pie",
    },
    labels: [
      "Correct Question",
      "InCorrect Question",
      "Right Marks",
      "InCorrect Marks",
    ],
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
      text: `Question & Marks Wise Report for ${Exam.name}`,
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, series[opts.seriesIndex]];
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
  height: 100%;
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
