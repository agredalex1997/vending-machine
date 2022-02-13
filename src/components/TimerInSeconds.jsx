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

  return (
    <div>
      <span>{timeLeft} seconds left</span>
      <div
        style={{
          maxWidth: (timeLeft / props.initialTime) * 100 + "%",
          height: "8px",
          backgroundColor: "black",
          marginTop: "4px",
        }}
      />
    </div>
  );
}

export default TimerInSeconds;
