import { ChildProcessWithoutNullStreams, spawn } from "child_process";

import {
  OnNewLogs,
  OnRawLog,
  OnSystemLog,
  ProcessesManager,
} from "./ProcessesManager";

export class Foreman {
  private manager: ProcessesManager;
  private childProcess: ChildProcessWithoutNullStreams;

  get processes() {
    return this.manager.processes;
  }

  constructor() {
    this.manager = new ProcessesManager();
    this.childProcess = spawn(
      "bundle",
      ["exec", "foreman", "start"]
      // "sh", [path.join(__dirname, "../../tests/mocks/fake-foreman.sh")]
    );

    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);
    this.onExit = this.onExit.bind(this);
    this.kill = this.kill.bind(this);
    this.childProcess.stdout.on("data", this.onData);
    this.childProcess.stderr.on("data", this.onError);
    this.childProcess.on("exit", this.onExit);
  }

  public on(event: "newLogs", callback: OnNewLogs): void;
  public on(event: "newSystemLog", callback: OnSystemLog): void;
  public on(event: "rawLogs", callback: OnRawLog): void;
  public on(
    event: "newLogs" | "newSystemLog" | "rawLogs",
    callback: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void {
    if (event === "newLogs") {
      this.manager.onNewLogs = callback;
    } else if (event === "newSystemLog") {
      this.manager.onSystemLog = callback;
    } else if (event === "rawLogs") {
      this.manager.onRawLog = callback;
    }
  }

  public kill(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.childProcess.killed) {
        this.childProcess.on("exit", () => resolve());
        this.childProcess.kill("SIGINT");
      }
    });
  }

  private onData(data: Buffer) {
    const value = data.toString();
    this.manager.addLogs(value);
  }

  private onError(data: Buffer) {
    throw new Error(data.toString());
  }

  private onExit(_code: number) {
    console.log("Foreman exited.");
  }
}
