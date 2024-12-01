import express from "express";
import { getAllPokemon, getPokemon } from "../controllers/pokemon.controller";
import { handleValidationErrors } from "../utils/favorite";
import { param } from "express-validator";

const router = express.Router();

router.get("/api/pokemon", getAllPokemon);
router.get(
  "/api/pokemon/:id",
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Pokémon ID must be a positive integer"),
  handleValidationErrors,
  getPokemon
);

export { router as pokemonRouter };
