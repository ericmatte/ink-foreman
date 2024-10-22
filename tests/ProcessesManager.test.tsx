import path from "path";
import fs from "fs";
import test from "ava";

import { ProcessesManager } from "../src/classes/ProcessesManager";

const MOCKED_FOREMAN_LOGS = fs.readFileSync(
  path.join(__dirname, "./mocks/foreman.txt"),
  "utf8"
);

test("classify processes", (t) => {
  const manager = new ProcessesManager();

  manager.addLogs(MOCKED_FOREMAN_LOGS);

  const rawLogs = Object.values(manager.processes).reduce<string[]>(
    (acc, p) => {
      p.data.forEach((d) => {
        acc.push(`${d.timestamp} ${p.name}`);
      });
      return acc;
    },
    []
  );

  t.is(manager.processesCount, 7);
  t.is(MOCKED_FOREMAN_LOGS.split("\n").length, rawLogs.length);
  t.true(rawLogs.every((log) => MOCKED_FOREMAN_LOGS.includes(log)));
});
