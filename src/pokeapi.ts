import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cacheInterval: number) {
    this.#cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("(using cache)");
      return cached;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const locations: ShallowLocations = await response.json();
      this.#cache.add(url, locations);
      return locations;
    } catch (err) {
      throw new Error(`Error fetching locations: ${(err as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.#cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const location: Location = await response.json();
      this.#cache.add(url, location);
      return location;
    } catch (err) {
      throw new Error(`Error fetching location '${locationName}': ${(err as Error).message}`);
    }
  }
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const pokemon: Pokemon = await response.json();
      this.#cache.add(url, pokemon);
      return pokemon;
    } catch (err) {
      throw new Error(`Error fetching pokemon '${pokemonName}': ${(err as Error).message}`);
    }
  }
}



export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};
