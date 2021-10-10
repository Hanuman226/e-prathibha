import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createPracticeExam } from "../../../api/examThunk";
import PreLoader from "../../../Components/PreLoader";
import Rules from "../../../Components/Rules";

export default function PracticeExamRules() {
  const [loading, setLoading] = useState(true);
  let { subjectId, packageId } = useParams();
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.exam.createPracticeExam.Exam);
  useEffect(() => {
    dispatch(createPracticeExam({ sub_id: subjectId, packageId: packageId }))
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);
  if (loading) {
    return <PreLoader />;
  }
  const { id = {}, name = {} } = payload || {};
  return <Rules quesCount={20} examid={id} examname={name} />;
}
