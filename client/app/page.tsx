import PokemonList from "./pages/home/pokemon_list";

const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

if (!base_url) {
  console.log(process.env);

  throw new Error("NEXT_PUBLIC_SERVER_URL environment variable is not set");
}

async function getPokemons() {
  const res = await fetch(`${base_url}`, {
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
