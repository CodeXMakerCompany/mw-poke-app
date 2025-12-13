import pokemonUseCase from "@application/pokemon";

class PokemonsRepository {
  constructor() {}

  async getPokemons() {
    try {
      const pokemons = await pokemonUseCase.getPokemonsUC();

      //DP
      // if (!) {}

      return {
        status: 200,
        message: "Pokemons found",
        pokemons: pokemons,
      };
    } catch (error) {
      console.log("POkemons list request failed:", error);

      return {
        status: 400,
        message: "Pokemons not found",
        reason: error,
      };
    }
  }

  async getPokemonsV2() {
    try {
      const pokemons = await pokemonUseCase.getPokemonsUCV2();

      //DP
      // if (!) {}

      return {
        status: 200,
        message: "Pokemons found",
        pokemons: pokemons,
      };
    } catch (error) {
      console.log("POkemons list request failed:", error);

      return {
        status: 400,
        message: "Pokemons not found",
        reason: error,
      };
    }
  }
}

export default PokemonsRepository;
