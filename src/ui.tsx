import React, { useRef } from "react";
import useStdoutDimensions from "ink-use-stdout-dimensions";
import { Text } from "ink";

import { useRawMode } from "./hooks/useRawMode";
import { useForeman } from "./hooks/useForeman";
import { ProcessesManager } from "./ProcessesManager";
import { LogsSection } from "./components/LogsSection";

interface Props {
  name?: string;
}

export const App = (_props: Props): React.ReactElement => {
  const manager = useRef(new ProcessesManager());
  const { killForeman } = useForeman(manager.current);

  useRawMode({ onCtrlC: killForeman });

  const [columns, rows] = useStdoutDimensions();

  return (
    <>
      <Text>
        ink-foreman {columns}×{rows}
      </Text>
      {Object.values(manager.current.processes).map((process) => (
        <LogsSection key={process.name} process={process} />
      ))}
    </>
  );
};
