import { spawn } from "child_process";
import { useApp, useStdin } from "ink";
import { useEffect, useState } from "react";
import path from "path";

export const useForeman = () => {
  const { exit } = useApp();
  const { setRawMode } = useStdin();
  const [data, setData] = useState("");

  useEffect(() => {
    setRawMode(true);
    const cmd = spawn("sh", [
      // path.join(__dirname, "../tests/mocks/foreman.txt"),
      path.join(__dirname, "../tests/foreman-link.sh"),
    ]);
    let hasExited = false;

    cmd.stdout.on("data", (data: Buffer) => {
      if (hasExited) return;
      setData(data.toString());
    });
    cmd.stderr.on("data", (data: Buffer) => {
      exit(new Error(data.toString()));
    });
    cmd.on("exit", (_code) => {
      hasExited = true;
      exit();
    });

    return () => {
      if (hasExited) return;
      hasExited = true;
      cmd.kill();
      setRawMode(false);
    };
  }, []);

  return [data];
};
