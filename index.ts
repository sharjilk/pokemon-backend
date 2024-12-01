import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { pokemonRouter } from "./src/routes/pokemon.routes";
import { favoriteRouter } from "./src/routes/favorite.routes";
import { initializeFavoritesFile } from "./src/utils/favorite";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(json());

app.use("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(pokemonRouter);
app.use(favoriteRouter);

initializeFavoritesFile();

app.listen(PORT, () => {
  console.log("Server listening on port 4000");
});

export default app;
