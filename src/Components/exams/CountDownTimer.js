import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

function getRemainingTimeUntilMsTimestamp(timestampMs) {
  const timestampDayjs = dayjs(timestampMs);
  const nowDayjs = dayjs();
  if (timestampDayjs.isBefore(nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    hours: getRemainingHours(nowDayjs, timestampDayjs),
    days: getRemainingDays(nowDayjs, timestampDayjs),
  };
}

function getRemainingSeconds(nowDayjs, timestampDayjs) {
  const seconds = timestampDayjs.diff(nowDayjs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
  const minutes = timestampDayjs.diff(nowDayjs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs, timestampDayjs) {
  const hours = timestampDayjs.diff(nowDayjs, "hours") % 24;
  return padWithZeros(hours, 2);
}

function getRemainingDays(nowDayjs, timestampDayjs) {
  const days = timestampDayjs.diff(nowDayjs, "days");
  return days.toString();
}

function padWithZeros(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString.length) + numberString;
}

export default function CountDownTimer({ examTime }) {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(examTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [examTime]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }
  return (
    <Wrapper
      hours={remainingTime.hours}
      minutes={remainingTime.minutes}
      seconds={remainingTime.seconds}
    >
      {`${remainingTime.hours} H : ${remainingTime.minutes} M : ${remainingTime.seconds} S`}
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
  transition: color 0.1s;
`;
