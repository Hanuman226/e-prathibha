import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cup from "../Icons/cup.png";
export default function ExamsList() {
  return (
    <Container fluid className="text-muted text-center">
      <section className="text-muted text-center">
        <h2 className="text-dark">PRATHIBHA UPSC Civils Pre-APP</h2>
        <h4>3 Years Previous Papers</h4>
        <h5>(3 Years Old Question Paper Civil services (Prelims))</h5>
        <h5>(1 / 3 Attempted)</h5>
        <List>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              2018 <br />
              Upsc prelims paper 1
           </Link>
          </ListItem>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              2019
              <br /> Upsc prelims paper 1
           </Link>
          </ListItem>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              2020
              <br />
              Upsc prelims paper 1
           </Link>
          </ListItem>
        </List>
      </section>

      <section>
        <h5>
          Limited UPSC Old Question Papers ( CDS, Geo Scientists(Pre), CISF,
          CAPF, NDA, Engineering Services (Pre) and SO)
        </h5>
        <h5>(2 / 3 Attempted)</h5>
        <List>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              CAPF 2020
              <br />
              Upsc prelims paper 1
           </Link>
          </ListItem>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              2019
              <br /> Upsc prelims paper 1
           </Link>
          </ListItem>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              2020
              <br />
              Upsc prelims paper 1
           </Link>
          </ListItem>
        </List>
      </section>
      <section>
        <h5>
          Limited questions from Basics of School NCERT ( 6th to 10th Class)
        </h5>
        <h5>(0/ 3 Attempted)</h5>
        <List>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              CAPF 2020
              <br />
              Upsc prelims paper 1
           </Link>
          </ListItem>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              2019
              <br /> Upsc prelims paper 1
           </Link>
          </ListItem>
          <ListItem>
           <Link to="/free-previous-papers/exam-rules">
              2020
              <br />
              Upsc prelims paper 1
           </Link>
          </ListItem>
        </List>
      </section>
      <p>*click on year to start your exam.</p>
      <img src={cup} alt="cup" className="img-fluid" width="400" height="400"/>
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
`;
