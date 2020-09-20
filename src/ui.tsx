import React, { useEffect, useState } from "react";
import useStdoutDimensions from "ink-use-stdout-dimensions";
import { Text } from "ink";

import { useRawMode } from "./hooks/useRawMode";
import { LogsSection } from "./components/LogsSection";
import { Foreman } from "./classes/Foreman";
import { Process } from "./classes/ProcessesManager";

const foreman = new Foreman();

interface Props {
  name?: string;
}

export const App = (_props: Props): React.ReactElement => {
  const [processes, setProcesses] = useState<Process[]>([]);

  useRawMode({ onCtrlC: foreman.kill });
  useEffect(() => {
    foreman.on("newLogs", setProcesses);
  }, []);

  const [columns, rows] = useStdoutDimensions();

  return (
    <>
      <Text>
        ink-foreman {columns}×{rows}
      </Text>
      {Object.values(processes).map((process) => (
        <LogsSection key={process.name} process={process} />
      ))}
    </>
  );
};
