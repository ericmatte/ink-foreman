import React from "react";
import { Box, Spacer, Text } from "ink";
import useStdoutDimensions from "ink-use-stdout-dimensions";

type Props = {
  systemStatus: string | null;
  showTimeStamps: boolean;
};

export const Legend = ({ systemStatus, showTimeStamps }: Props) => {
  const [columns, rows] = useStdoutDimensions();

  const commands: { value: string; title: string }[] = [
    { value: "Q", title: "Quit" },
    { value: "R", title: "Raw logs" },
    { value: "TAB", title: "Focus" },
    { value: "ENTER", title: "Expand" },
    { value: "SPACE", title: "Collapse" },
    { value: "T", title: (showTimeStamps ? "Hide" : "Show") + " timestamps" },
  ];

  return (
    <Box>
      <Text wrap="truncate-end">
        {commands.map((cmd) => (
          <React.Fragment key={cmd.value}>
            <Text color="black" backgroundColor="cyan">
              {` ${cmd.value} `}
            </Text>
            <Text color="cyan">{` ${cmd.title} `}</Text>
          </React.Fragment>
        ))}
        {systemStatus && (
          <Text>
            {` -  `}
            <Text color="red">[System]</Text> {systemStatus}
          </Text>
        )}
      </Text>
      <Spacer />
      {columns >= 140 && <Text dimColor>{`${columns}x${rows}`}</Text>}
    </Box>
  );
};
