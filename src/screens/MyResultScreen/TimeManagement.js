import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TableWrapper } from "../../Components/StyledComponents";
import convertToHMS from "../../utils/convertToHMS";
import TimeManagementChart from "./TimeManagementChart";
export default function TimeManagement() {
  const { examResult } = useSelector((state) => state.exam);

  const { userMarksheet } = examResult;
  const {
    examDetails: { Exam },
  } = examResult;

  return (
    <Container>
      <p className="fs-5">
        <span className="fw-bold">Time Management For</span> {Exam.name}
      </p>
      <TableWrapper className="mb-5">
        <Table
          striped
          bordered
          hover
          responsive
          className=" align-middle text-center"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Questions</th>
              <th>Correct/InCorrect Question</th>
              <th>Marks Scored/ Negative Marks</th>
              <th>Unattempted Questions / Marks</th>
              <th>Total Time</th>
            </tr>
          </thead>
          <tbody>
            {userMarksheet.map((item, index) => {
              const { Subject } = Object.values(item)[0];

              return (
                <tr>
                  <td className="text-primary ">{Subject.name}</td>
                  <td>{Subject.total_question}</td>
                  <td>
                    {Subject.correct_question}/{Subject.incorrect_question}
                  </td>
                  <td>
                    {Subject.marks_scored}/{Subject.negative_marks}
                  </td>
                  <td>
                    {Subject.unattempted_question}/
                    {Subject.unattempted_question_marks}
                  </td>
                  <td>{convertToHMS(Subject.time_taken)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
      <TimeManagementChart />
    </Container>
  );
}
