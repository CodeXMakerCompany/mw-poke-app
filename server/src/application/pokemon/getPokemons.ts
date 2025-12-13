import { POKEMON_BASE_URL } from "constants/pokemon";
import HttpInvoker from "infra/services/http_invoker";

interface DTOPokemonItem {
  name: string;
  url: string;
}

interface DTOPokemonGETResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DTOPokemonItem[];
}

const getPokemonsUseCaseV1 = async (): Promise<DTOPokemonItem[]> => {
  let nextUrl: string | null = POKEMON_BASE_URL;
  const allPokemons: DTOPokemonItem[] = [];

  while (nextUrl) {
    const response = await HttpInvoker.call<DTOPokemonGETResponse>(
      nextUrl,
      "GET"
    );

    allPokemons.push(...response.data.results);

    nextUrl = response.data.next as string | null;
  }

  return allPokemons;
};

export default getPokemonsUseCaseV1;
