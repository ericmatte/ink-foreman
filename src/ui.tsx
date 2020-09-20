import React from "react";
import { Box, Text, useFocus } from "ink";

interface Props {
  name?: string;
}

export const App = ({ name = "Stranger" }: Props): React.ReactElement => {
  const { isFocused } = useFocus();
  const { isFocused: is2 } = useFocus();

  return (
    <>
      <Text>{isFocused ? "I am focused" : "I am not focused"}</Text>
      {/* <Text>
      Hello, <Text color="green">{name}</Text>
    </Text> */}
      <Box borderStyle="round" borderColor="green">
        <Text>Green Rounded Box</Text>
      </Box>
      <Text>{is2 ? "I am too focused" : "I am not too focused"}</Text>
    </>
  );
};
