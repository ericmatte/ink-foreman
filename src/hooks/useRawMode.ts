import { useApp, useInput, useStdin } from "ink";
import { useEffect } from "react";

export const useRawMode = (onCtrlC: () => void) => {
  const { exit } = useApp();
  const { setRawMode } = useStdin();

  useEffect(() => {
    setRawMode(true);
    return () => {
      setRawMode(false);
    };
  }, []);

  useInput((input, key) => {
    if (input === "q") {
      exit();
    }

    if (key.ctrl && input === "c") {
      onCtrlC();
    }
  });
};
