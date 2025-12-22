import {
  POKEMON_BASE_URL,
  POKEMON_DEFAULT_PAGINATION,
} from "constants/pokemon";
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

interface DTOResponsePokemonList {
  pages: number;
  list: DTOResponsePokemonItem[];
}

interface DTOPokemonGETResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DTOPokemonItem[];
}

interface PokemonSourceData {
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PaginationParams {
  limit?: string;
  offset?: string;
  keyword?: string;
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

const getFullPokemonsList = async (
  pokemons_count?: number | null,
  paginationParams?: PaginationParams
) => {
  try {
    const offset = paginationParams?.offset;
    // const keyword = paginationParams?.keyword;
    let url = `${POKEMON_BASE_URL}?limit=${
      pokemons_count || paginationParams?.limit
    }`;

    if (offset) {
      url = url.concat(`&offset=${offset || POKEMON_DEFAULT_PAGINATION}`);
    }

    // if (keyword) {
    //   url = url.concat(`search=${keyword}`);
    // }
    // console.log("server url", url);

    const response = await HttpInvoker.call<DTOPokemonGETResponse>(url, "GET");

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
        HttpInvoker.call<PokemonSourceData>(`${url}`, "GET")
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

const pokemonDataAdapter = (
  pokemon: PokemonSourceData
): DTOResponsePokemonItem => {
  const types = pokemon?.types?.map((t) => t.type.name) || [];
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

const getPokemonsUseCaseV1 = async (
  paginationParams?: PaginationParams
): Promise<DTOResponsePokemonList> => {
  const limit = paginationParams?.limit;
  const offset = paginationParams?.offset;
  const keyword = paginationParams?.keyword;

  const isPaginated = limit && offset;

  if (pokemonsWithDetailsCache.length && !isPaginated) {
    return {
      list: pokemonsWithDetailsCache,
      pages: 0,
    };
  }

  const count = await getLatestCountOfPokemons();

  const pages = count / parseInt(limit as string);

  const pokemons_list = await getFullPokemonsList(isPaginated ? null : count, {
    ...(isPaginated && { limit, offset, keyword }),
  });

  if (keyword) {
    const pokemon = await HttpInvoker.call<PokemonSourceData>(
      `${POKEMON_BASE_URL}/${keyword}`,
      "GET"
    );
    return {
      list: [pokemonDataAdapter(pokemon.data)],
      pages,
    };
  }

  const pokemons_with_details = await getPokemonDetailsBatches(
    pokemons_list.map((poke) => poke.url)
  );

  if (!isPaginated) {
    pokemonsWithDetailsCache = pokemons_with_details;
  }

  return {
    list: pokemons_with_details,
    pages,
  };
};

export default getPokemonsUseCaseV1;
