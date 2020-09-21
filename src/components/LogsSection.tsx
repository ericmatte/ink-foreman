import React, { useEffect } from "react";
import { Box, Text, useFocus } from "ink";

import { Process } from "../classes/ProcessesManager";

type Props = {
  process: Process;
  showTimeStamps: boolean;
  autoFocus: boolean;
  onFocus: () => void;
  height?: number;
};

export const LogsSection = ({
  process,
  showTimeStamps,
  autoFocus,
  onFocus,
  height = 1,
}: Props) => {
  const { isFocused } = useFocus({ autoFocus });

  const data = process.data;
  const latestTimeStamp = data[data.length - 1]?.timestamp;
  const realEstate = [...Array(Math.max(height - 1, 0)).keys()].reverse();

  useEffect(() => {
    if (isFocused) {
      onFocus();
    }
  }, [isFocused, onFocus]);

  return (
    <Box flexDirection="column" height={height}>
      <Text color={process.color}>
        {"╭─ "}
        <Text bold={isFocused}>
          {`${latestTimeStamp || ""} ${isFocused ? "━━" : "──"} `}
          {process.name}
          {isFocused && " ◀"}
        </Text>
      </Text>
      {realEstate.map((index) => {
        const log = data[data.length - 1 - index];
        return (
          <Text key={index}>
            <Text color={process.color}>{"│ "}</Text>
            {log && (
              <Text key={`${log.timestamp}-${log.value}`}>
                {showTimeStamps && ` ${log.timestamp} `}
                {log.value}
              </Text>
            )}
          </Text>
        );
      })}
    </Box>
  );
};
