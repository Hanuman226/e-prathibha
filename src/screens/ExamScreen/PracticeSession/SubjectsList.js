import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getPracticeSessionSubjects } from "../../../api/examThunk";
import PreLoader from "../../../Components/PreLoader";
import { FancyButton } from "../../../Components/StyledComponents";
export default function SubjectsList() {
  const [loading, setLoading] = useState(true);
  const { category, packageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const payload = useSelector((state) => state.exam.practiceSessionSubjects);
  console.log({ payload });
  useEffect(() => {
    dispatch(getPracticeSessionSubjects({ type: category, packageId }))
      .unwrap()
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Container fluid className="text-muted text-center">
      <FancyButton className="mb-2" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={["fas", "arrow-left"]} />
        <span className="ps-2">Back</span>
      </FancyButton>
      <h2 className="text-dark text-uppercase">{category}</h2>
      <p className="my-4 fs-4">Please select the subject</p>
      <section className="text-muted text-center ">
        <List>
          {payload.map(({ name, total, attempted, unattempted, id }, index) => (
            <ListItem key={id}>
              <StyledLink
                as={Link}
                // to={`/free_previous_papers/instruction/${Exam.name}/${Exam.id}`}
                to={`/practice_session/${packageId}/instruction/${name}/${id}`}
                className="d-flex flex-column"
              >
                <span>{name}</span>
                <span>total({total})</span>
                <span>attempted({attempted})</span>
                <span>unattempted({unattempted})</span>
              </StyledLink>
            </ListItem>
          ))}
        </List>
      </section>
    </Container>
  );
}

const StyledLink = styled.a`
  padding: 1.25rem;
  margin: 0 0.5rem;
  border-radius: 0.3rem;
  width: 25rem;
  text-transform: uppercase;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
  &:active {
    box-shadow: none;
  }
`;
const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: 0.625rem;
`;
const ListItem = styled.li`
  min-width: 25%;
`;
