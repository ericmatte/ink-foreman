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
    { value: "TAB", title: "Focus process" },
    // { value: "ENTER", title: "Collapse" },
    { value: "SPACE", title: "Expand" },
    { value: "T", title: (showTimeStamps ? "Hide" : "Show") + " timestamps" },
  ];

  return (
    <Box>
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
      <Spacer />
      <Text dimColor>{`${columns}x${rows}`}</Text>
    </Box>
  );
};
