import { useParams } from "react-router-dom";
import Rules from "../../Components/Rules";
export default function ExamRules() {
  let { examname, examid } = useParams();
  return <Rules quesCount={120} examid={examid} examname={examname} />;
}
