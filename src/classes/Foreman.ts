import { ChildProcessWithoutNullStreams, spawn } from "child_process";
// import path from "path";

import { OnNewLogs, ProcessesManager } from "./ProcessesManager";

export class Foreman {
  private manager: ProcessesManager;
  private childProcess: ChildProcessWithoutNullStreams;

  get processes() {
    return this.manager.processes;
  }

  constructor() {
    this.manager = new ProcessesManager();
    // spawn("sh", [path.join(__dirname, "../../tests/foreman-link.sh")])
    this.childProcess = spawn("bundle", ["exec", "foreman", "start"]);

    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);
    this.onExit = this.onExit.bind(this);
    this.kill = this.kill.bind(this);
    this.childProcess.stdout.on("data", this.onData);
    this.childProcess.stderr.on("data", this.onError);
    this.childProcess.on("exit", this.onExit);
  }

  public on(_event: "newLogs", callback: OnNewLogs) {
    this.manager.onNewLogs = callback;
  }

  public kill(): Promise<void> {
    console.log("KILL!");

    return new Promise((resolve) => {
      if (!this.childProcess.killed) {
        console.log("Shutting down...");
        this.childProcess.on("exit", () => resolve());
        this.childProcess.kill("SIGINT");
      }
    });
  }

  private onData(data: Buffer) {
    this.manager.addLogs(data.toString());
  }

  private onError(data: Buffer) {
    console.log("Erreur :O!");
    throw new Error(data.toString());
  }

  private onExit(_code: number) {
    console.log("Foreman exited.");
  }
}
