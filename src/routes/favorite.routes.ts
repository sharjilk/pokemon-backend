import express, { Request, Response, Router } from "express";
import {
  addFavoritePokemon,
  getAllFavorites,
  removeFavoritePokemon,
} from "../controllers/favorite.controller";
import { handleValidationErrors } from "../utils/favorite";
import { body, param } from "express-validator";

const router: Router = express.Router();

// Add favorite
router.post(
  "/api/favorites",
  body("id")
    .isInt({ gt: 0 })
    .withMessage("Pokémon ID must be a positive integer"),
  handleValidationErrors,
  addFavoritePokemon as (req: Request, res: Response) => void
);

// remove from favorite
router.delete(
  "/api/favorites/:id",
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Pokémon ID must be a positive integer"),
  handleValidationErrors,
  removeFavoritePokemon as (req: Request, res: Response) => void
);

// Get list of favorite
router.get(
  "/api/favorites",
  getAllFavorites as (req: Request, res: Response) => void
);

export { router as favoriteRouter };
