import { useState } from "react";
import { ForegroundColor } from "chalk";

type Log = {
  value: string;
  timestamp: string;
};

type Process = {
  name: string;
  color: typeof ForegroundColor;
  data: Log[];
};

export const PROCESS_COLORS: Array<typeof ForegroundColor> = [
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

export class ProcessesManager {
  processes: { [index: string]: Process } = {};

  get processesCount(): number {
    return Object.keys(this.processes).length;
  }

  public addLogs(rawLogs: string) {
    const logs = rawLogs.split("\n");
    logs.forEach((log) => this.addLog(log));
  }

  private addLog(log: string) {
    const groups = log.match(/([0-9:]{8}) ([^ ]*)[ ]*\| (.*)/);
    if (groups === null) return;

    const [, timestamp, processName, logValue] = groups;
    if (!this.processes[processName]) {
      this.processes[processName] = {
        name: processName,
        color: PROCESS_COLORS[this.processesCount % PROCESS_COLORS.length],
        data: [],
      };
    }

    this.processes[processName].data.push({ timestamp, value: logValue });
  }
}

export const useProcesses = () => {
  const [manager] = useState(new ProcessesManager());

  return {
    manager,
    processes: manager.processes,
  };
};
