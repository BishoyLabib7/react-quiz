import { useEffect } from "react";
import { useQuize } from "../context/QuizeProvider";

function Timer() {
  const { dispatch, secondsRemaining } = useQuize();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {/* {secondsRemaining} */}
      {minutes < 10 && "0"}
      {minutes}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
