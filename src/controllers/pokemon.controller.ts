import axios from "axios";
import { Request, Response } from "express";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

interface Pokemon {
  name: string;
  url: string;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export const getAllPokemon = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 150;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const response = await axios.get<PaginatedResponse>(
      `${BASE_URL}?limit=${limit}&offset=${offset}`
    );
    const { count, next, previous, results } = response.data;

    res.json({
      count,
      next: next
        ? `/api/pokemon?limit=${limit}&offset=${offset + limit}`
        : null,
      previous: previous
        ? `/api/pokemon?limit=${limit}&offset=${Math.max(0, offset - limit)}`
        : null,
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Pokémon data" });
  }
};

export const getPokemon = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = response.data;

    const details = {
      id: pokemonData.id,
      name: pokemonData.name,
      abilities: pokemonData.abilities.map((a: any) => a.ability.name),
      types: pokemonData.types.map((t: any) => t.type.name),
      stats: pokemonData.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      weight: pokemonData.weight,
      height: pokemonData.height,
      sprites: pokemonData.sprites,
    };

    res.status(200).json(details);
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: "Pokémon not found" });
    } else {
      res.status(500).json({ error: "Failed to fetch Pokémon details" });
    }
  }
};
