import styled from "styled-components";
import icon3 from "../../Icons/3.png";
import CustomModal from "../../Components/CustomModal";
import useToggle from "../../Hooks/useToggle";
export default function Card(props) {
  const [show, toggle] = useToggle();
  return (
    <Wrapper>
      <CardIcon>
        <img src={icon3} alt="" />
      </CardIcon>
      <Description>
        <h4>Practice Session</h4>
        <ul>
          <li>Category wise exams (NCERT, UPSC, Other UPSC).</li>
          <li>Attempt subject wise exams.</li>
          <li>Can attempt only 20 question per exam.</li>
        </ul>
      </Description>
      <Footer>
        <button onClick={toggle}>start now</button>
      </Footer>
      <CustomModal
        show={show}
        toggle={toggle}
        title={"Practice Session"}
        link="/free-previous-papers"
      >
        <ModalContent>
          <h4>Practice Yourself</h4>
          <p>Get random questions of all difficulty levels.</p>
          <ul>
            <li>Category wise exams (NCERT, UPSC, Other UPSC).</li>
            <li>Attempt subject wise exams.</li>
            <li>Can attempt only 20 question per exam.</li>
          </ul>
        </ModalContent>
      </CustomModal>
    </Wrapper>
  );
}

const ModalContent = styled.div`
  & ul {
    list-style: upper-alpha;
  }
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2.1875rem 0.625rem 0.625rem 0.625rem;
  display: grid;
  grid-template-areas: "icon desc" ". . " "footer footer";
  grid-template-columns: 5.3125rem 1fr;
  grid-template-rows: 1fr 1.875rem 2.5rem;
  border-radius: 0.625rem;
  box-shadow: 0 0 1.875rem 0.3125rem hsl(0deg 0% 0% / 20%);
`;

const CardIcon = styled.div`
  grid-area: icon;
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: hsl(222deg 100% 89%);
`;
const Description = styled.div`
  grid-area: desc;
  & h4 {
    text-decoration: underline;
    text-transform: uppercase;
  }
  & ul {
    list-style: upper-alpha;
  }
`;

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  & button {
    height: 2.5rem;
    width: 6.25rem;
    border-radius: 0.625rem;
    border: none;
    text-transform: uppercase;
    padding: 0.625rem;
    font-size: 0.75rem;
    font-weight: bold;
    background-color: black;
    color: white;
    cursor: pointer;
    box-shadow: 0 0 0.3125rem 0.125rem hsl(0deg 0% 0% / 40%);
    outline: none;
  }

  & button:active {
    box-shadow: none;
  }
`;
