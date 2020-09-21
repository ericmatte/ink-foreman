import React, { useEffect, useState } from "react";
import { useInput } from "ink";

import { useRawMode } from "./hooks/useRawMode";
import { LogsSection } from "./components/LogsSection";
import { Foreman } from "./classes/Foreman";
import { DetailedLog, Log, Process } from "./classes/ProcessesManager";
import { Legend } from "./components/Legend";
import { useHeights } from "./hooks/useHeights";
import { useSectionFocusManager } from "./hooks/useSectionFocusManager";
import { RawLogs } from "./components/RawLogs";

const foreman = new Foreman();

interface Props {
  name?: string;
}

export const App = (_props: Props): React.ReactElement => {
  const [focusedSection, setFocusedSection] = useState(0);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [rawLogs, setRawLogs] = useState<DetailedLog[]>([]);
  const [showRawLogs, setShowRawLogs] = useState(false);
  const [showTimeStamps, setShowTimeStamps] = useState(false);
  const [currentSystemLog, setCurrentSystemLog] = useState<Log | null>(null);

  useSectionFocusManager();
  useRawMode({ onCtrlC: foreman.kill });
  useEffect(() => {
    foreman.on("newLogs", setProcesses);
    foreman.on("newSystemLog", setCurrentSystemLog);
    foreman.on("rawLogs", (value) => setRawLogs((logs) => [...logs, value]));
  }, []);

  useInput((input) => {
    if (input === "t") {
      setShowTimeStamps((value) => !value);
    } else if (input === "r") {
      setShowRawLogs((value) => !value);
    }
  });

  const processSections = Object.values(processes);
  const { heights } = useHeights(processSections.length, focusedSection);

  return (
    <>
      {showRawLogs ? (
        <RawLogs logs={rawLogs} />
      ) : (
        processSections.map((process, index) => (
          <LogsSection
            key={process.name}
            process={process}
            showTimeStamps={showTimeStamps}
            height={heights[index]}
            autoFocus={index === 0}
            onFocus={() => setFocusedSection(index)}
          />
        ))
      )}
      <Legend showTimeStamps={showTimeStamps} statusLog={currentSystemLog} />
    </>
  );
};
