import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { pokemonRouter } from "./routes/pokemon.routes";
import { favoriteRouter } from "./routes/favorite.routes";
import { initializeFavoritesFile } from "./utils/favorite";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(json());

app.use("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.use(pokemonRouter);
app.use(favoriteRouter);

initializeFavoritesFile();

app.listen(PORT, () => {
  console.log("Server listening on port 4000");
});

export default app;
