import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { useApp } from "ink";
import { useCallback, useEffect, useState } from "react";
import path from "path";

type ChildProcess = ChildProcessWithoutNullStreams | null;

export const useForeman = () => {
  const { exit } = useApp();
  const [foreman, setForeman] = useState<ChildProcess>(null);
  const [data, setData] = useState("");

  const killForeman = useCallback(async () => {
    if (foreman === null) return;
    return new Promise((resolve, reject) => {
      foreman.on("exit", () => {
        resolve();
      });
      foreman.kill();
    });
  }, []);

  useEffect(() => {
    const cmd = spawn("sh", [path.join(__dirname, "../tests/foreman-link.sh")]);
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

    setForeman(cmd);
    return () => {
      if (hasExited) return;
      hasExited = true;
      cmd.kill();
    };
  }, []);

  return { data, killForeman };
};