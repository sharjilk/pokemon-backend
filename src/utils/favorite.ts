import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const FAVORITES_FILE = path.join(__dirname, "favorites.json");

export const getFavorites = async (): Promise<number[]> => {
  try {
    const data = await fs.readFile(FAVORITES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    logger.error("Error reading favorites file:", error);
    return [];
  }
};

export const saveFavorites = async (favorites: number[]): Promise<void> => {
  try {
    await fs.writeFile(FAVORITES_FILE, JSON.stringify(favorites, null, 2));
  } catch (error) {
    logger.error("Error saving favorites file:", error);
  }
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export const initializeFavoritesFile = async () => {
  try {
    await fs.access(FAVORITES_FILE);
  } catch {
    await fs.writeFile(FAVORITES_FILE, JSON.stringify([]));
  }
};
