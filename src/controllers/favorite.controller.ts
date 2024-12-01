import { Request, Response } from "express";
import { getFavorites, saveFavorites } from "../utils/favorite";
import { logger } from "../utils/logger";

export const addFavoritePokemon = async (req: Request, res: Response) => {
  const { id } = req.body;

  const favorites = await getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    await saveFavorites(favorites);
    logger.info(`Pokémon ID ${id} added to favorites`);
  }
  res.status(200).json(favorites);
};

export const removeFavoritePokemon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const favorites = await getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav !== id);
  await saveFavorites(updatedFavorites);

  logger.info(`Pokémon ID ${id} removed from favorites`);
  res.status(200).json(updatedFavorites);
};

export const getAllFavorites = async (req: Request, res: Response) => {
  const favorites = await getFavorites();
  res.status(200).json(favorites);
};
