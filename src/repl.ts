import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];

    if (command) {
      try {
        command.callback(state);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Unknown command");
    }

    state.rl.prompt();
  });
}