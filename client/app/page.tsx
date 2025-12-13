import PokemonList from "./pages/home/pokemon_list";

const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

async function getPokemons() {
  const res = await fetch(`${base_url}/pokemons`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

export default async function Home() {
  const response = await getPokemons();

  return (
    <>
      <PokemonList pokemons={response.pokemons} />
    </>
  );
}
