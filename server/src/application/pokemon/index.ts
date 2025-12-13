import getPokemons from "./getPokemons";
import getPokemonsV2 from "./getPokemonsV2";

const pokemonUseCases = {
  getPokemonsUC: getPokemons,
  getPokemonsUCV2: getPokemonsV2,
};

export default pokemonUseCases;
