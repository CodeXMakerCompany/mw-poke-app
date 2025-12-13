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

async function* getPokemonsPaginated(): AsyncGenerator<
  DTOPokemonItem[],
  void,
  unknown
> {
  let nextUrl: string | null = POKEMON_BASE_URL;

  while (nextUrl) {
    const response = await HttpInvoker.call<DTOPokemonGETResponse>(
      nextUrl,
      "GET"
    );

    if (!response.data?.results) {
      throw new Error("Invalid response");
    }

    yield response.data.results;
    nextUrl = response.data.next as string | null;
  }
}

const getPokemonsUseCaseV2 = async (): Promise<DTOPokemonItem[]> => {
  for await (const pokemonPage of getPokemonsPaginated()) {
    console.log(`Received ${pokemonPage.length} pokemons`);
  }
  return [];
};

export default getPokemonsUseCaseV2;
