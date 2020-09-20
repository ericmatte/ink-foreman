import React from "react";
import useStdoutDimensions from "ink-use-stdout-dimensions";
import { Box, Text, useFocus } from "ink";
import { useForeman } from "./foreman-watchdog";

interface Props {
  name?: string;
}

export const App = ({ name = "Stranger" }: Props): React.ReactElement => {
  const { isFocused } = useFocus();
  const [data] = useForeman();
  const [columns, rows] = useStdoutDimensions();

  return (
    <>
      <Text color="black">{data}</Text>
      <Text>
        {columns}×{rows}
      </Text>
      <Text>{isFocused ? "I am focused" : "I am not focused"}</Text>
      {/* <Text>
      Hello, <Text color="green">{name}</Text>
    </Text> */}
      <Box borderStyle="round" borderColor="green">
        <Text>Green Rounded Box</Text>
      </Box>
    </>
  );
};
