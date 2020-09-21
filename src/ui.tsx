import React, { useEffect, useState } from "react";
import { useInput } from "ink";

import { useRawMode } from "./hooks/useRawMode";
import { LogsSection } from "./components/LogsSection";
import { Foreman } from "./classes/Foreman";
import { Process } from "./classes/ProcessesManager";
import { Legend } from "./components/Legend";

const foreman = new Foreman();

interface Props {
  name?: string;
}

export const App = (_props: Props): React.ReactElement => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [showTimeStamps, setShowTimeStamps] = useState(false);

  useRawMode({ onCtrlC: foreman.kill });
  useEffect(() => {
    foreman.on("newLogs", setProcesses);
  }, []);

  useInput((input) => {
    if (input === "t") {
      setShowTimeStamps((value) => !value);
    }
  });

  // const [columns, rows] = useStdoutDimensions();

  return (
    <>
      {Object.values(processes).map((process) => (
        <LogsSection
          key={process.name}
          process={process}
          showTimeStamps={showTimeStamps}
        />
      ))}
      <Legend
        systemStatus={"Started foreman."}
        showTimeStamps={showTimeStamps}
      />
    </>
  );
};
