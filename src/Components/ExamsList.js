import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { freeExamList } from "../actions/examActions";
import cup from "../Icons/cup.png";
export default function ExamsList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.freeExamList);
  useEffect(() => {
    if (data === "") dispatch(freeExamList());
  }, [dispatch, data]);

  if (data.loading === false) {
    var {
      freeExamList: { pending, exams },
    } = data;
    var [section1, section2, section3] = exams;
    var { "Old question papers UPSC Civils (Pre)": civils } = section1;
    var { "Limited UPSC other than Civils": upsc } = section2;
    var { "Limited NCERT": ncert } = section3;
  }
  return data.loading === true ? (
    <h1>Loading...</h1>
  ) : (
    <Container fluid className="text-muted text-center">
      <h2 className="text-dark">PRATHIBHA UPSC Civils Pre-APP</h2>
      <section className="text-muted text-center">
        <h4>3 Years Previous Papers</h4>
        <h5>(3 Years Old Question Paper Civil services (Prelims))</h5>
        {data.loading === false && (
          <h5>
            ({section1.attempted} / {section1.total} Attempted)
          </h5>
        )}
        <List>
          {data.loading === false &&
            civils.map(({ Exam, ...rest }, index) => (
              <ListItem key={Exam.id}>
                <Link to={`/free-previous-papers/${Exam.id}/exam-rules`}>
                  {Exam.name}
                  <br />
                  Upsc prelims paper 1
                </Link>
              </ListItem>
            ))}
        </List>
      </section>

      <section>
        <h5>
          Limited UPSC Old Question Papers ( CDS, Geo Scientists(Pre), CISF,
          CAPF, NDA, Engineering Services (Pre) and SO)
        </h5>
        {data.loading === false && (
          <h5>
            ({section2.attempted} / {section2.total} Attempted)
          </h5>
        )}
        <List>
          {data.loading === false &&
            upsc.map(({ Exam, ...rest }, index) => (
              <ListItem key={Exam.id}>
                <Link to={`/free-previous-papers/${Exam.id}/exam-rules`}>
                  {Exam.name}
                  <br />
                  Upsc prelims paper 1
                </Link>
              </ListItem>
            ))}
        </List>
      </section>
      <section>
        <h5>
          Limited questions from Basics of School NCERT ( 6th to 10th Class)
        </h5>
        {data.loading === false && (
          <h5>
            ({section3.attempted} / {section3.total} Attempted)
          </h5>
        )}
        <List>
          {data.loading === false &&
            ncert.map(({ Exam, ...rest }, index) => (
              <ListItem key={Exam.id}>
                <Link to={`/free-previous-papers/${Exam.id}/exam-rules`}>
                  {Exam.name}
                  <br />
                  Upsc prelims paper 1
                </Link>
              </ListItem>
            ))}
        </List>
      </section>
      <p>*click on year to start your exam.</p>
      <img src={cup} alt="cup" className="img-fluid" width="400" height="400" />
    </Container>
  );
}

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: 0.625rem;
`;
const ListItem = styled.li`
  min-width: 25%;
  & a {
    height: 6.25rem;
    padding: 1.25rem;
    border-radius: 0.3rem;
    width: 100%;
    text-transform: uppercase;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-decoration: none;
    box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
  }
  & a:active {
    box-shadow: none;
  }
`;
