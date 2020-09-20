import { useApp, useInput, useStdin } from "ink";
import { useCallback, useEffect } from "react";

type RawModeOptions = { onCtrlC: () => Promise<void> };

export const useRawMode = ({ onCtrlC }: RawModeOptions): void => {
  const { exit } = useApp();
  const { setRawMode } = useStdin();

  const handleCtrlC = useCallback(async () => {
    await onCtrlC();
    exit();
  }, [exit, onCtrlC]);

  useEffect(() => {
    setRawMode(true);
    return () => {
      setRawMode(false);
    };
  }, [setRawMode]);

  useInput((input, key) => {
    if (input === "q") {
      exit();
    }

    if (key.ctrl && input === "c") {
      handleCtrlC();
    }
  });
};
