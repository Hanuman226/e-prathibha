import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CustomModal from "../../Components/CustomModal";
import { HorizontalBreak } from "../../Components/StyledComponents";

export default function QuestionPaperModal(props) {
  const { show, toggle } = props;
  const payload = useSelector((state) => state.exam.examsData);
  return (
    <CustomModal show={show} toggle={toggle} title={"Question Paper"} size="xl">
      {payload.exam.map((item) => {
        const { ExamStat, Question } = item;
        let { option_selected, ques_no } = ExamStat;
        let {
          question: { above, table, below },
          option1,
          option2,
          option3,
          option4,
        } = Question;

        const options = [option1, option2, option3, option4];
        return (
          <div key={ques_no + option_selected}>
            <p className="fw-bold">Question No.{ques_no}</p>
            <div dangerouslySetInnerHTML={{ __html: above }}></div>
            {table && <div dangerouslySetInnerHTML={{ __html: table }}></div>}
            {below && <div dangerouslySetInnerHTML={{ __html: below }}></div>}
            <HorizontalBreak />
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Col sm={10}>
                  {options.map((option, index) => (
                    <div className="form-check" key={option + index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={"options" + ques_no}
                        value={index + 1}
                        checked={
                          option_selected === null
                            ? false
                            : parseInt(option_selected, 10) === index + 1
                            ? true
                            : false
                        }
                        disabled={true}
                      />
                      <label
                        className="form-check-label"
                        dangerouslySetInnerHTML={{ __html: option }}
                      ></label>
                    </div>
                  ))}
                </Col>
              </Form.Group>
            </fieldset>
          </div>
        );
      })}
    </CustomModal>
  );
}
