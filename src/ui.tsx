import React, { useEffect, useState } from "react";
import { useInput } from "ink";

import { useRawMode } from "./hooks/useRawMode";
import { LogsSection } from "./components/LogsSection";
import { Foreman } from "./classes/Foreman";
import { Process } from "./classes/ProcessesManager";
import { Legend } from "./components/Legend";
import { useSectionHeights } from "./hooks/useSectionHeights";

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

  const processSections = Object.values(processes);
  const { heights } = useSectionHeights(processSections.length);

  return (
    <>
      {processSections.map((process, index) => (
        <LogsSection
          key={process.name}
          process={process}
          showTimeStamps={showTimeStamps}
          height={heights[index]}
        />
      ))}
      <Legend
        systemStatus={"Started foreman."}
        showTimeStamps={showTimeStamps}
      />
    </>
  );
};
