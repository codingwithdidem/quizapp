import { useState, useEffect, useRef } from "react";

const useTimer = (duration: number, onTimeout: () => void) => {
  const [timePassed, setTimePassed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimePassed((timePassed) => {
        if (timePassed === duration) {
          clearInterval(timerRef.current);
          onTimeout();
          return timePassed;
        }
        return timePassed + 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [duration, onTimeout]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimePassed(0);
  };

  const interruptTimer = () => {
    clearInterval(timerRef.current);
  };

  return { timePassed, interruptTimer, resetTimer };
};

export default useTimer;
