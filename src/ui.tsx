import React, { useEffect, useState } from "react";
import { useInput } from "ink";

import { useRawMode } from "./hooks/useRawMode";
import { LogsSection } from "./components/LogsSection";
import { Foreman } from "./classes/Foreman";
import { Process } from "./classes/ProcessesManager";
import { Legend } from "./components/Legend";
import { useHeights } from "./hooks/useHeights";
import { useSectionFocusManager } from "./hooks/useSectionFocusManager";

const foreman = new Foreman();

interface Props {
  name?: string;
}

export const App = (_props: Props): React.ReactElement => {
  const [focusedSection, setFocusedSection] = useState(0);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [showTimeStamps, setShowTimeStamps] = useState(false);

  useSectionFocusManager();
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
  const { heights } = useHeights(processSections.length, focusedSection);

  return (
    <>
      {processSections.map((process, index) => (
        <LogsSection
          key={process.name}
          process={process}
          showTimeStamps={showTimeStamps}
          height={heights[index]}
          autoFocus={index === 0}
          onFocus={() => setFocusedSection(index)}
        />
      ))}
      <Legend
        systemStatus={"Started foreman."}
        showTimeStamps={showTimeStamps}
      />
    </>
  );
};
