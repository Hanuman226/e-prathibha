import { Card } from "react-bootstrap";
import CustomModal from "../../Components/CustomModal";

export default function InstructionsModal(props) {
  const { show, toggle, examName } = props;
  const questionsCount = examName.startsWith("practice") ? 20 : 120;
  return (
    <CustomModal
      show={show}
      toggle={toggle}
      title={`Instructions of ${examName}`}
      size="xl"
    >
      <Card>
        <Card.Body>
          <ul style={{ listStyle: "decimal" }}>
            <li>
              This test contains {questionsCount} items (questions). Each item
              comprises four responses (answers). You will select the response
              which you want to mark. In case, you feel that there is more than
              one correct response, mark the response which you consider the
              best. In any case, choose ONLY ONE response for each item.
            </li>
            <li>All items carry equal marks.</li>
            <li>Penalty for wrong Answers :</li>
          </ul>
          <p>
            THERE WILL BE PENALTY FOR WRONG ANSWERS MARKED BY A CANDIDATE IN THE
            OBJECTIVE TYPE QUESTION PAPERS.
          </p>
          <ul style={{ listStyle: "decimal" }}>
            <li>
              There are four alternatives for the answer to every question. For
              each question for which a wrong answer has been given by the
              candidate, two-third of the marks assigned to that question will
              be deducted as penalty.
            </li>
            <li>
              If a candidate gives more than one answer, it will be treated as a
              wrong answer even if one of the given answers happens to be
              correct and there will be same penalty as above to that question.
            </li>
            <li>
              If a question is left blank i.e., no answer is given by the
              candidate, there will be no penalty for that question.
            </li>
          </ul>
        </Card.Body>
      </Card>
    </CustomModal>
  );
}
