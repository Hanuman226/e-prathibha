import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createPracticeExam } from "../../../api/examThunk";
import Rules from "../../../Components/Rules";

export default function PracticeExamRules() {
  let { subjectId, packageId, examname } = useParams();
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.exam.createPracticeExam.Exam);
  useEffect(() => {
    dispatch(createPracticeExam({ sub_id: subjectId, packageId: packageId }));
  }, []);
  if (!payload) {
    return <h1>Loading...</h1>;
  }
  const { id = {}, name = {} } = payload || {};
  return <Rules quesCount={20} examid={id} examname={name} />;
}
