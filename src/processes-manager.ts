import { useState } from "react";
import { ForegroundColor } from "chalk";

// ForegroundColor

type Process = {
  data: string[];
  color: typeof ForegroundColor;
};

const PROCESS_COLORS: Array<typeof ForegroundColor> = [
  "greenBright",
  "blueBright",
  "redBright",
  "magentaBright",
  "yellowBright",
  "green",
  "blue",
  "red",
  "magenta",
  "yellow",
];

class ProcessesManager {
  processesCount = 0;
  processes: { [index: string]: Process } = {};

  public addLogs(rawLogs: string) {
    const logs = rawLogs.split("\n");
    logs.forEach((log) => this.addLog(log));
  }

  private addLog(log: string) {
    const groups = log.match(/[0-9:]{8} ([^ ]*)[ ]*\| (.*)/);
    if (groups === null) return;

    const [, processName, processLog] = groups;
    this.processesCount += 1;
    if (!this.processes[processName]) {
      this.processes[processName] = {
        data: [],
        color: PROCESS_COLORS[this.processesCount % PROCESS_COLORS.length],
      };
    }
    this.processes[processName].data.push(processLog);
  }
}

export const useProcesses = () => {
  const [manager] = useState(new ProcessesManager());

  return {
    manager,
    processes: manager.processes,
  };
};
