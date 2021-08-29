import { useEffect, useState } from "react";
import styled from "styled-components";

export default function CountDownTimer({ examTime }) {
  const [seconds, setSeconds] = useState(examTime);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const padZero = (num) => {
    if (num.toString().length === 1) return num.toString().padStart(2, 0);
    return num;
  };
  const secondsToHMS = (value) => {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    return setTimeLeft({
      hours: hours,
      minutes: minutes,
      seconds: padZero(seconds),
    });
  };

  useEffect(() => {
    if (seconds !== 0) setTimeout(() => setSeconds(seconds - 1), 1000);
    secondsToHMS(seconds);
    if (seconds === 0) clearTimeout();
  }, [seconds]);

  return (
    <Wrapper
      hours={timeLeft.hours}
      minutes={timeLeft.minutes}
      seconds={timeLeft.seconds}
    >
      {seconds !== 0
        ? `${timeLeft.hours} H : ${timeLeft.minutes} M : ${timeLeft.seconds} S`
        : "Timed Out !"}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 3rem;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;

  color: ${(props) => props.hours === 0 && props.minutes < 10 && "yellow"};
  color: ${(props) => props.hours === 0 && props.minutes === 0 && "red"};
  transition: color 0.2s;
`;
