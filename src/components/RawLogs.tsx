import React from "react";
import { Static, Text } from "ink";

import { DetailedLog } from "../classes/ProcessesManager";

type Props = {
  logs: DetailedLog[];
};

export const RawLogs = ({ logs }: Props) => {
  return (
    <Static items={logs}>
      {(log) => (
        <Text
          key={`${log.name}-${log.timestamp}-${log.value}`}
          wrap="truncate-end"
        >
          <Text color={log.color}>
            <Text dimColor>{log.timestamp}</Text>
            {` ${log.name}`}
            {log.separator}
          </Text>
          {log.value}
        </Text>
      )}
    </Static>
  );
};
