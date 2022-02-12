import { useEffect, useState } from "react";

function TimerInSeconds(props) {
  const [timeLeft, setTimeLeft] = useState(props.initialTime);
  const [intervalID, setIntervalID] = useState();

  useEffect(() => {
    setIntervalID(
      setInterval(() => {
        setTimeLeft((prevState) => prevState - 1);
      }, 1000)
    );
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalID);
      props.onReachZero();
    }
  }, [timeLeft]);

  return <span>{timeLeft}</span>;
}

export default TimerInSeconds;
