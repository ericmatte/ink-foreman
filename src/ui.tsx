import React from "react";
import { Text } from "ink";

interface Props {
  name?: string;
}

export const App: React.FC<Props> = ({ name }: Props): React.ReactElement => (
  <Text>
    Hello, <Text color="green">{name}</Text>
  </Text>
);

App.defaultProps = {
  name: "Stranger",
};
