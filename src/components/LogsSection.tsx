import React from "react";
import { Box, Newline, Spacer, Text, useFocus } from "ink";

import { Process } from "../ProcessesManager";

type Props = {
  process: Process;
};

export const LogsSection = ({ process }: Props) => {
  const { isFocused } = useFocus();
  const log = process.data[process.data.length - 1];
  return (
    <Box borderStyle="round" borderColor={process.color}>
      {isFocused && <Text>▶️</Text>}
      <Text>{process.name}</Text>
      <Newline />
      <Spacer />
      {/* {process.data.map((log) => (
        <React.Fragment key={`${log.timestamp}-${log.value}`}>
          <Text>
            {log.timestamp} | {log.value}
          </Text>
          <Newline />
        </React.Fragment>
      ))} */}
      <Text>
        {log?.timestamp} | {log?.value}
      </Text>
    </Box>
  );
};
