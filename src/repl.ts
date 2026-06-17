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

  state.rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1);
    const command = state.commands[commandName];

    if (command) {
      try {
        await command.callback(state, ...args);
      } catch (err) {
        console.log((err as Error).message);
      }
    } else {
      console.log("Unknown command");
    }

    state.rl.prompt();
  });
}