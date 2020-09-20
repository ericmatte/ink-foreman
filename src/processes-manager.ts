import { useState } from "react";

class ProcessesManager {
  processes: { [index: string]: string[] } = {};

  public addLogs(rawLogs: string) {
    const logs = rawLogs.split("\n");
    logs.forEach((log) => this.addLog(log));
  }

  private addLog(log: string) {
    const groups = log.match(/[0-9:]{8} ([^ ]*)[ ]*\| (.*)/);
    if (groups === null) return;

    if (!process[groups[1]]) {
      process[groups[1]] = [];
    }
    process[groups[1]].push(groups[2]);
  }
}

export const useProcesses = () => {
  const [manager] = useState(new ProcessesManager());

  return {
    manager,
    processes: manager.processes,
  };
};
