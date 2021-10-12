import styled from "styled-components";
import { useEffect, useState } from "react";
export default function Footer() {
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());
  const currentYear = new Date().getFullYear();
  const date = new Date();
  const localDate = date.toLocaleDateString();

  useEffect(() => {
    const timerId = setInterval(
      () => setLocalTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(timerId);
  }, []);
  return (
    <Wrapper>
      <p className="mb-0">
        Copyright &copy; {currentYear}{" "}
        <span className="fw-bold">E-Prathibha</span>
      </p>
      <p className="mb-0">{`Date :- ${localDate}  Time :- ${localTime}`}</p>
      <p className="mb-0">
        Powered by :{" "}
        <a
          href="https://www.errortechnologies.com/"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none"
        >
          Error Technologies
        </a>
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  color: white;
  padding: 1rem;
`;
