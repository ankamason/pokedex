import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Please provide a pokemon name to catch");
    return;
  }

  const pokemonName = args[0];
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  const catchChance = 50 / (1 + pokemon.base_experience / 100);
  const roll = Math.random() * 100;

  if (roll < catchChance) {
    console.log(`${pokemon.name} was caught!`);
    console.log("You may now inspect it with the inspect command.");
    state.pokedex[pokemon.name] = pokemon;
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
