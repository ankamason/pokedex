import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Please provide a location area name to explore");
    return;
  }

  const areaName = args[0];
  console.log(`Exploring ${areaName}...`);

  const location = await state.pokeapi.fetchLocation(areaName);

  console.log("Found Pokemon:");
  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
