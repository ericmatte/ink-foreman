import { useApp, useInput, useStdin } from "ink";
import { useCallback, useEffect, useState } from "react";

type RawModeOptions = { onCtrlC: () => Promise<void> };

export const useRawMode = ({ onCtrlC }: RawModeOptions): void => {
  const [sigCount, setSigCount] = useState(0);
  const { exit } = useApp();
  const { setRawMode } = useStdin();

  const handleCtrlC = useCallback(async () => {
    setSigCount(sigCount + 1);
    if (sigCount === 0) {
      await onCtrlC();
      exit();
    } else {
      exit(new Error("Exited."));
    }
  }, [exit, onCtrlC, sigCount]);

  useEffect(() => {
    setRawMode(true);
    return () => {
      setRawMode(false);
    };
  }, [setRawMode]);

  useInput((input, key) => {
    if ((key.ctrl && input === "c") || input === "q") {
      handleCtrlC();
    }
  });
};
