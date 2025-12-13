import express, { Request, Response } from "express";

import pokemonRepositoryI from "@domain/repositories/pokemonRepository";
import auth from "infra/middlewares/auth";

const pokeRouter = express.Router();

const pokemonRepository = new pokemonRepositoryI();

//Protecting
pokeRouter.use(auth);

pokeRouter.get("/", async (req: Request, res: Response) => {
  try {
    // UserValidator.checkGetUserPayload(req.query);
    const response = await pokemonRepository.getPokemonsV2();

    return res.send(response);
  } catch (error) {}
});

export default pokeRouter;
