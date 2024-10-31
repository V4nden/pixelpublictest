import { useEffect, useState } from "react";

const useTextInputSimulation = (text: string, duration: number) => {
  const [textState, setTextState] = useState("");

  useEffect(() => {
    text.split("").forEach((letter, index) => {
      setTimeout(() => {
        setTextState((prev) => prev + letter);
      }, (duration / text.length) * (index + 1));
    });
  }, []);

  return textState;
};

export default useTextInputSimulation;
