import { useEffect, useState } from "react";

const steps = [
  "ev_id",
  "",
  "a",
  "av",
  "avi",
  "avid",
  "avid ",
  "avid U",
  "avid U.",
  "",
  "e",
  "ev",
  "ev_",
  "ev_i",
  "ev_id",
];

export function useTypingName(
  speed: number = 200,
  pauseMultiplier: number = 40
) {
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(speed);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => {
        // loop
        if (prev === steps.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, delay]);

  useEffect(() => {
    const value = steps[index];

    // pause at completed words
    if (value === "ev_id" || value === "avid U.") {
      setDelay(speed * pauseMultiplier);
    } else {
      setDelay(speed);
    }
  }, [index, speed, pauseMultiplier]);

  return `D${steps[index]}`;
}
