import React, { useCallback, useState } from "react";
import useStdoutDimensions from "ink-use-stdout-dimensions";
import { Box, Text, useApp, useFocus } from "ink";
import { useRawMode } from "./hooks/useRawMode";

interface Props {
  name?: string;
}

export const App = ({ name = "Stranger" }: Props): React.ReactElement => {
  const { isFocused } = useFocus();

  const [state, setState] = useState("initialState");
  const { exit } = useApp();
  const onCtrlC = useCallback(() => {
    setState("exiting...");
    setTimeout(() => exit(), 2000);
  }, []);

  useRawMode(onCtrlC);
  const [columns, rows] = useStdoutDimensions();

  return (
    <>
      {/* <Text color="black">{data}</Text> */}
      <Text>
        {columns}×{rows} - {state}
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
