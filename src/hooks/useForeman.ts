import { useCallback, useEffect, useRef } from "react";
import { useApp } from "ink";
import { spawn } from "child_process";
// import path from "path";

import { ProcessesManager } from "../ProcessesManager";

export const useForeman = (manager: ProcessesManager) => {
  const { exit } = useApp();
  const foreman = useRef(
    // spawn("sh", [path.join(__dirname, "../../tests/foreman-link.sh")])
    spawn("bundle", ["exec", "foreman", "start"])
  );

  const killForeman = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      console.log("Shutting down...");
      foreman.current.on("exit", () => {
        resolve();
      });
      foreman.current.kill("SIGINT");
    });
  }, []);

  useEffect(() => {
    const cmd = foreman.current;
    cmd.stdout.on("data", (data: Buffer) => {
      console.log(data.toString());

      manager.addLogs(data.toString());
    });
    cmd.stderr.on("data", (data: Buffer) => {
      exit(new Error(data.toString()));
    });
    cmd.on("exit", (_code) => {
      exit();
    });

    return () => {
      cmd.removeAllListeners();
    };
  }, [exit, manager]);

  return { killForeman };
};
