import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { pokemonRouter } from "../routes/pokemon.routes";
import { favoriteRouter } from "../routes/favorite.routes";
import { initializeFavoritesFile } from "../utils/favorite";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(json());

app.use(pokemonRouter);
app.use(favoriteRouter);

initializeFavoritesFile();

// Removed for vercel deployment
// app.listen(PORT, () => {
//   console.log("Server listening on port 4000");
// });

export default app;
