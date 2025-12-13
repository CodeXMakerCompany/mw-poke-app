import { Express } from "express";

import pokeRoutes from "./poke.route";

const getRoutes = (app: Express, version = 1) => {
  if (version === 1) {
    app.use("/pokemons", pokeRoutes);
  }

  return app;
};

export default getRoutes;
