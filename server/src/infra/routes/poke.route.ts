import express, { Request, Response } from "express";

import pokemonRepositoryI from "@domain/repositories/pokemonRepository";
import auth from "infra/middlewares/auth";

const pokeRouter = express.Router();

const pokemonRepository = new pokemonRepositoryI();

//TODO: Protect with auth
pokeRouter.use(auth);

pokeRouter.get("/", async (req: Request, res: Response) => {
  try {
    //TODO: Add params validation if we got them
    const response = await pokemonRepository.getPokemons();

    return res.send(response);
  } catch (error) {
    console.log('Error on get pokemons route reason:', error);

    return res.status(400).send({
      message: "We cant retrieve the pokemons at moment try later"
    });
  }
});

export default pokeRouter;
