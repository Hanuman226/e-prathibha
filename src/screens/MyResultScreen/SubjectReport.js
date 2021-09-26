import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TableWrapper } from "../../Components/StyledComponents";
import GraphicalReportChart from "./GraphicalReportChart";
export default function SubjectReport() {
  const payload = useSelector((state) => state.exam.examResult);

  if (!payload) {
    return <h3>Loading... </h3>;
  }

  const { userMarksheet } = payload;
  const {
    examDetails: { Exam },
  } = payload;

  return (
    <Container>
      <p className="fs-5">
        <span className="fw-bold">Subject Report For</span> {Exam.name}
      </p>
      <TableWrapper>
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
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
      <GraphicalReportChart />
    </Container>
  );
}
