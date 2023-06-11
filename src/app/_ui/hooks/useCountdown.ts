import { useState, useEffect } from "react";

export const useCountdown = (seconds: number) => {
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    if (countdown === 0) return;

    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return countdown;
};
