"use client";
import { Pokemon } from "@/app/models/pokemon";

import PokemonItem from "./pokemon_item";
import { Grid, Typography } from "@mui/material";
import BasicPagination from "@/app/components/shared/pagination";
import PokeSearchbar from "@/app/components/shared/searchbar";

const PokemonList = ({
  pokemons,
  page_count,
}: {
  pokemons: Pokemon[];
  page_count?: number;
}) => {
  return (
    <>
      <PokeSearchbar />
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 600,
          textTransform: "capitalize",
          my: 4,
          color: "#ffffff",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Pokemon List
      </Typography>

      <Grid container spacing={2}>
        {pokemons?.map(({ name, image, types }, idx) => (
          <Grid key={idx} size={{ xs: 4, md: 3, xl: 2 }}>
            <PokemonItem id={idx} name={name} types={types} image={image} />
          </Grid>
        ))}
        <BasicPagination pages_count={page_count} origin_page="/" />
      </Grid>
    </>
  );
};

export default PokemonList;
