import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  const caught = Object.keys(state.pokedex);

  if (caught.length === 0) {
    console.log("Your Pokedex is empty. Go catch some pokemon!");
    return;
  }

  console.log("Your Pokedex:");
  for (const name of caught) {
    console.log(` - ${name}`);
  }
}
