import React from "react";
import { Box, Text, useFocus } from "ink";

import { Process } from "../classes/ProcessesManager";

type TitleProps = {
  processName: string;
  latestTimeStamp: string | null;
  isFocused: boolean;
};

type Props = {
  process: Process;
  showTimeStamps: boolean;
};

const SectionTitle = ({
  processName,
  isFocused,
  latestTimeStamp = "",
}: TitleProps) => {
  return (
    <>
      {latestTimeStamp && `╭─ ${latestTimeStamp} ${isFocused ? "━━" : "──"} `}
      {processName}
      {isFocused && " ◀"}
    </>
  );
};

export const LogsSection = ({ process, showTimeStamps }: Props) => {
  const { isFocused } = useFocus();

  const latestTimeStamp = process.data[process.data.length - 1]?.timestamp;

  return (
    <Box flexDirection="column">
      <Text bold={isFocused} color={process.color}>
        <SectionTitle
          processName={process.name}
          isFocused={isFocused}
          latestTimeStamp={latestTimeStamp}
        />
      </Text>
      {process.data.map((log) => (
        <Text key={`${log.timestamp}-${log.value}`}>
          <Text color={process.color}>{"│ "}</Text>
          {showTimeStamps && ` ${log.timestamp} `}
          {log.value}
        </Text>
      ))}
    </Box>
  );
};
