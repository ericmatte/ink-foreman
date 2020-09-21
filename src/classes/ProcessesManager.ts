import { ForegroundColor } from "chalk";

export type Log = {
  value: string;
  timestamp: string;
};

export type DetailedLog = Log &
  Pick<Process, "name" | "color"> & {
    separator: string;
  };

export type Process = {
  name: string;
  color: typeof ForegroundColor;
  data: Log[];
};

export type OnNewLogs = (process: Process[]) => void;
export type OnRawLog = (log: DetailedLog) => void;
export type OnSystemLog = (log: Log) => void;

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
  public onRawLog: OnRawLog | null = null;
  public onSystemLog: OnSystemLog | null = null;

  get processesCount(): number {
    return Object.keys(this.processes).length;
  }

  public addLogs(rawLogs: string) {
    const logs = rawLogs.split("\n");
    logs.forEach((log) => {
      if (log.trim() !== "") {
        this.addLog(log);
      }
    });

    if (this.onNewLogs) {
      this.onNewLogs(Object.values(this.processes));
    }
  }

  private addLog(logValue: string) {
    const groups = logValue.match(/([0-9:]{8}) ([^ ]*)([ ]*\| )(.*)/);
    if (groups === null) return;

    const [, timestamp, processName, separator, value] = groups;
    const log: Log = { timestamp, value };

    if (processName === "system") {
      if (this.onSystemLog) {
        this.onSystemLog(log);
      }
    } else {
      if (!this.processes[processName]) {
        this.processes[processName] = {
          name: processName,
          color: PROCESS_COLORS[this.processesCount % PROCESS_COLORS.length],
          data: [],
        };
      }
      this.processes[processName].data.push(log);
    }

    if (this.onRawLog) {
      this.onRawLog({
        timestamp,
        value,
        color: this.processes[processName]?.color || PROCESS_COLORS[0],
        name: processName,
        separator,
      });
    }
  }
}
