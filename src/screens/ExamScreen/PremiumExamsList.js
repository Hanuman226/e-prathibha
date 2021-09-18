import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { premiumExamList } from "../../api/examThunk";
import cup from "../../Icons/cup.png";
export default function FreeExamsList() {
  const dispatch = useDispatch();
  const { exams } = useSelector((state) => state.exam.premiumExamsList);
  useEffect(() => {
    dispatch(premiumExamList());
  }, []);

  if (!exams.length) {
    return <h1>Loading...</h1>;
  }

  const [section1, section2, section3] = exams;
  const { "26 Years Old": civils } = section1;
  const { "2014-2020 UPSC": upsc } = section2;
  const { "Comprehensive NCERT": ncert } = section3;
  const headings = [
    `(26 Years Old Question Paper Civil services (Prelims))`,
    `(2014-2020 Other UPSC Old Question Papers ( CDS, Geo Scientists(Pre), CISF,
    CAPF, NDA, Engineering Services (Pre) and SO)`,
    `Comprehensive Basics of School NCERT ( 6th to 10th Class)`,
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
      <h4>(Premium)</h4>
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
                  to={`/premium_previous_papers/instruction/${Exam.name}/${Exam.id}`}
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
  min-width: 16%;
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
