import { POKEMON_BASE_URL } from "constants/pokemon";
import HttpInvoker from "infra/services/http_invoker";

interface DTOPokemonItem {
  name: string;
  url: string;
}

interface DTOResponsePokemonItem {
  name: string;
  types: string[];
  image: string;
}

interface DTOPokemonGETResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DTOPokemonItem[];
}

let pokemonsWithDetailsCache: DTOResponsePokemonItem[] = [];

const getLatestCountOfPokemons = async () => {
  try {
    const response = await HttpInvoker.call<DTOPokemonGETResponse>(
      POKEMON_BASE_URL,
      "GET"
    );

    return response.data.count;
  } catch (error) {
    console.log(error);

    throw Error("We cannot retrieve pokemon count atm try again later");
  }
};

const getFullPokemonsList = async (pokemons_count: number) => {
  try {
    const response = await HttpInvoker.call<DTOPokemonGETResponse>(
      `${POKEMON_BASE_URL}?limit=${pokemons_count}`,
      "GET"
    );

    return response.data.results;
  } catch (error) {
    console.log(error);

    throw Error("We cannot retrieve pokemon list atm try again later");
  }
};

const getPokemonDetailsBatches = async (urls: string[], batch_size = 100) => {
  const results = [];

  for (let i = 0; i < urls.length; i += batch_size) {
    const pokemon_batch = urls.slice(i, i + batch_size);

    const batch_results = await Promise.all(
      pokemon_batch.map((url: string) =>
        HttpInvoker.call<DTOPokemonGETResponse>(`${url}`, "GET")
      )
    );

    const parsed_batch = batch_results.map((pokemon_with_details) => {
      const clean_pokemon = pokemonDataAdapter(pokemon_with_details.data);
      return clean_pokemon;
    });

    results.push(...parsed_batch);
  }

  return results;
};

const pokemonDataAdapter = (pokemon: any): DTOResponsePokemonItem => {
  const types =
    pokemon?.types?.map((t: { type: { name: string } }) => t.type.name) || [];
  const image =
    pokemon?.sprites?.front_default ||
    pokemon?.sprites?.other["official-artwork"].front_default ||
    pokemon?.sprites?.front_shiny ||
    "replace on client";
  return {
    name: pokemon?.name,
    types,
    image,
  };
};

const getPokemonsUseCaseV1 = async (): Promise<DTOResponsePokemonItem[]> => {
  if (pokemonsWithDetailsCache.length) {
    return pokemonsWithDetailsCache;
  }
  const count = await getLatestCountOfPokemons();
  const pokemons_list = await getFullPokemonsList(count);

  const pokemons_with_details = await getPokemonDetailsBatches(
    pokemons_list.map((poke) => poke.url)
  );

  pokemonsWithDetailsCache = pokemons_with_details;

  return pokemons_with_details;
};

export default getPokemonsUseCaseV1;
