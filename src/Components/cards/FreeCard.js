import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";
import useModal from "../../Hooks/useModal";
import icon1 from "../../Icons/1.png";
import Modal from "../Modal";
export default function Card({ progress }) {
  const [show, toggle] = useModal();
  return (
    <Wrapper>
      <Label>
        <FontAwesomeIcon icon={["fas", "star"]} />
        <span>free</span>
      </Label>
      <CardIcon>
        <img src={icon1} alt="" />
      </CardIcon>
      <Description>
        <h4>Explore for free</h4>
        <ul>
          <li>3 Years Old Question Paper Civil services (Prelims)</li>
          <li>
            Limited UPSC Old Question Papers ( CDS, Geo Scientists(Pre), CISF,
            CAPF, NDA, Engineering Services (Pre) and SO)
          </li>
          <li>
            Limited questions from Basics of School NCERT ( 6th to 10th Class)
          </li>
        </ul>
      </Description>
      <ProgressBar color={"red"} fill={progress} />
      <Footer>
        <button onClick={toggle}>start now</button>
      </Footer>
      <Modal
        show={show}
        toggle={toggle}
        title={"Explore For Free"}
        link="/free-previous-papers"
      >
        <ModalContent>
          <h4>Free Previous Papers Practice</h4>
          <p>
            UPSC is Unpredictable. But we can help you in a very small way to
            prepare smart!
          </p>
          <p>
            Get a sense of UPSC examination by practising previous years
            question papers and analyse your performance.
          </p>
          <p>
            Get your papers evaluated and see where you stand in your journey
            for cracking UPSC examination this year
          </p>

          <ul>
            <li>3 Years Old Question Paper Civil services (Prelims)</li>
            <li>
              Limited UPSC Old Question Papers ( CDS, Geo Scientists(Pre), CISF,
              CAPF, NDA, Engineering Services (Pre) and SO)
            </li>
            <li>
              Limited questions from Basics of School NCERT ( 6th to 10th Class)
            </li>
          </ul>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}
const ModalContent = styled.div`
  & ul {
    list-style: upper-alpha;
  }
`;
const move = keyframes`
 from{
    background-position: 0 0;
  }
  to {
    background-position: 50px 50px;
  }
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2.1875rem 0.625rem 0.625rem 0.625rem;
  display: grid;
  grid-template-areas: "icon desc" "bar bar " "footer footer";
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
const ProgressBar = styled.div`
  grid-area: bar;
  height: 0.75rem;
  width: 100%;
  background-color: #0a0c0f;
  position: relative;
  border-radius: 0.625em;
  &::after {
    content: attr(fill) "%";
    color: white;
    border-radius: 0.625rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.color};
    width: ${(props) => props.fill + "%"};
    height: 0.75rem;
    position: absolute;

    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.4) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      transparent 75%,
      transparent
    );
    background-size: 50px 50px;
    animation: ${move} 2s linear infinite;
  }
`;
const Footer = styled.div`
  grid-area: footer;
  display: flex;
  width: 100%;
  justify-content: flex-end;

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

const Label = styled.div`
  position: absolute;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 1.875rem;
  height: 1.875rem;
  top: 0;
  right: 0.625rem;
  border-bottom-right-radius: 0.3125rem;
  border-bottom-left-radius: 0.3125rem;

  & svg {
    font-size: 0.875rem;
  }
  & span {
    padding-left: 0.5rem;
    color: black;
    text-transform: uppercase;
  }
`;
