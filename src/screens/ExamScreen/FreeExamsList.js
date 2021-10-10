import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { freeExamList } from "../../api/examThunk";
import cup from "../../Icons/cup.png";
import PreLoader from "../../Components/PreLoader";
export default function FreeExamsList() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { exams } = useSelector((state) => state.exam.freeExamsList);
  useEffect(() => {
    dispatch(freeExamList())
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  const [section1, section2, section3] = exams;
  const { "Old question papers UPSC Civils (Pre)": civils } = section1;
  const { "Limited UPSC other than Civils": upsc } = section2;
  const { "Limited NCERT": ncert } = section3;
  const headings = [
    `(3 Years Old Question Paper Civil services (Prelims))`,
    `Limited UPSC Old Question Papers ( CDS, Geo Scientists(Pre), CISF,
  CAPF, NDA, Engineering Services (Pre) and SO)`,
    ` Limited questions from Basics of School NCERT ( 6th to 10th Class)`,
  ];
  const sections = [
    {
      section: civils,
      attempted: section1.attempted,
      total: section1.total,
      heading: headings[0],
    },
    {
      section: upsc,
      attempted: section2.attempted,
      total: section2.total,
      heading: headings[1],
    },
    {
      section: ncert,
      attempted: section3.attempted,
      total: section3.total,
      heading: headings[2],
    },
  ];

  return (
    <Container fluid className="text-muted text-center">
      <h2 className="text-dark">PRATHIBHA UPSC Civils Pre-APP</h2>
      <h4>3 Years Previous Papers</h4>
      {sections.map(({ section, attempted, total, heading }, index) => (
        <section className="text-muted text-center" key={index}>
          <h5>{heading}</h5>
          <h5>
            ({attempted} / {total} Attempted)
          </h5>
          <List>
            {section.map(({ Exam }) => (
              <ListItem key={Exam.id}>
                <Link
                  to={`/free_previous_papers/instruction/${Exam.name}/${Exam.id}`}
                >
                  {Exam.name}
                  <br />
                  Upsc prelims paper 1
                </Link>
              </ListItem>
            ))}
          </List>
        </section>
      ))}
      <p>*click on year to start your exam.</p>
      <img src={cup} alt="cup" className="img-fluid" width="350" height="350" />
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
