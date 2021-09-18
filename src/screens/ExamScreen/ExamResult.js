import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { examResult } from "../../api/examThunk";
import ColumnChart from "../../Components/charts/ColumnChart";
import { Wrapper } from "../../Components/StyledComponents";
export default function ExamResult() {
  const examResultId = useSelector(
    (state) => state.exam.examsData.exam[0].ExamStat.exam_result_id
  );
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.exam.examResult);
  useEffect(() => {
    dispatch(examResult({ id: examResultId }));
  }, []);

  if (payload === "") {
    return <h1>Loading...</h1>;
  }

  const {
    correctQuestion,
    incorrectQuestion,
    rightMarksArr: {
      ExamStat: { total_marks },
    },
    negativeMarksArr: {
      ExamStat: { total_marks: total_neg_marks },
    },
    leftQuestion,
    leftQuestionArr: {
      ExamStat: { left_marks },
    },
    bookmarkCount,
    examDetails: {
      Result: { total_question },
    },
    secondGraph: { tot, correct },
  } = payload;
  const examResultData = {
    "Correct Question": correctQuestion,
    "InCorrect Question": incorrectQuestion,
    "Right Marks": total_marks,
    "Negative Marks": total_neg_marks,
    "Left Question": leftQuestion,
    "Left Marks": left_marks,
    "Bookmark Count": bookmarkCount,
  };

  return (
    <Wrapper>
      <h3 className="pb-3">Exam Summary</h3>
      <Table striped bordered hover>
        <tbody>
          {Object.entries(examResultData).map((item) => {
            return (
              <tr>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h3 className="py-3">Current Exam Performance</h3>
      <ColumnChart
        shadow={true}
        chartData={[total_question, correctQuestion]}
      />
      <h3 className="py-3">Exam Wise Performance</h3>
      <ColumnChart shadow={true} chartData={[tot, correct]} />
    </Wrapper>
  );
}
