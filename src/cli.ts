#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import { App } from "./ui";

const cli = meow(`
	Usage
	  $ ink-foreman

	Options
		--name  Your name

	Examples
	  $ ink-foreman --name=Jane
	  Hello, Jane
`);

render(React.createElement(App, cli.flags), {
  exitOnCtrlC: false, // Handled by the application
});
