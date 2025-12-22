import MediaPlayer from "./components/unique/mediaPlayer";
import { DEFAULT_ITEMS_PAGINATION } from "./constants";
import PokemonList from "./pages/home/pokemon_list";

const base_url = process.env.NEXT_PUBLIC_SERVER_URL;

if (!base_url) {
  throw new Error("Server URL is not defined");
}

async function getPokemons(page: number, keyword?: string) {
  let url = `${base_url}/pokemons?limit=${DEFAULT_ITEMS_PAGINATION}&offset=${
    page * DEFAULT_ITEMS_PAGINATION
  }`;

  if (keyword) {
    url = `${url}&keyword=${keyword}`;
  }
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

type Props = {
  searchParams: { page: number; keyword?: string };
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const response = await getPokemons(0 || params.page - 1, params?.keyword);

  return (
    <>
      <PokemonList pokemons={response.pokemons} page_count={response.pages} />
      <MediaPlayer />
    </>
  );
}
