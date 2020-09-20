import { ForegroundColor } from "chalk";

type Log = {
  value: string;
  timestamp: string;
};

export type Process = {
  name: string;
  color: typeof ForegroundColor;
  data: Log[];
};

export type OnNewLogs = (process: Process[]) => void;

export const PROCESS_COLORS: Array<typeof ForegroundColor> = [
  "greenBright",
  "blueBright",
  "redBright",
  "magentaBright",
  "yellowBright",
  "cyanBright",
  "greenBright",
];

export class ProcessesManager {
  public processes: { [index: string]: Process } = {};
  public onNewLogs: OnNewLogs | null = null;

  get processesCount(): number {
    return Object.keys(this.processes).length;
  }

  public addLogs(rawLogs: string) {
    const logs = rawLogs.split("\n");
    logs.forEach((log) => {
      if (log !== "") {
        this.addLog(log);
      }
    });

    if (this.onNewLogs) {
      this.onNewLogs(Object.values(this.processes));
    }
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
