import request from "supertest";
import express from "express";
import { pokemonRouter } from "../routes/pokemon.routes";

const app = express();
app.use(express.json());
app.use("/", pokemonRouter);

// Fallback 404 handler for undefined routes in test environment
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

describe("Pokémon Details API", () => {
  it("should return Pokémon details for a valid ID", async () => {
    const res = await request(app).get("/api/pokemon/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("should return 400 for invalid ID format", async () => {
    const res = await request(app).get("/api/pokemon/invalid-id");
    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe(
      "Pokémon ID must be a positive integer"
    );
  });

  it("should return 404 for non-existent Pokémon ID", async () => {
    const res = await request(app).get("/api/pokemon/99999");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Pokémon not found");
  });
});
