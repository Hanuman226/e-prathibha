export default function convertToHMS(value) {
  const sec = parseInt(value, 10);
  if (sec === 0) {
    return "-";
  }
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  if (hours === 0 && minutes !== 0) {
    return `${minutes} Mins ${seconds} Secs`;
  } else if (hours === 0 && minutes === 0) {
    return `${seconds} Secs`;
  } else if (hours !== 0 && minutes === 0 && seconds === 0) {
    return `${hours} Hrs`;
  } else if (hours === 0 && minutes !== 0 && seconds === 0) {
    return `${minutes} mins`;
  }
  return `${hours} Hrs ${minutes} Mins ${seconds} Secs`;
}
