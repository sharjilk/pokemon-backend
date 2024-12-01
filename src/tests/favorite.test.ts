import request from "supertest";
import app from "../../index";
import fs from "fs/promises";
import path from "path";

const FAVORITES_FILE = path.join(__dirname, "../utils/favorites.json");

beforeEach(async () => {
  await fs.writeFile(FAVORITES_FILE, JSON.stringify([]));
});

describe("Pokémon Favorites API", () => {
  it("should add a Pokémon to the favorites list", async () => {
    const response = await request(app).post("/api/favorites").send({ id: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toContain(1);
  });

  it("should remove a Pokémon from the favorites list", async () => {
    await request(app).post("/api/favorites").send({ id: 1 });

    const response = await request(app).delete("/api/favorites/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toContain(1);
  });

  it("should return the current list of favorite Pokémon", async () => {
    await request(app).post("/api/favorites").send({ id: 1 });
    await request(app).post("/api/favorites").send({ id: 25 });

    const response = await request(app).get("/api/favorites");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([1, 25]);
  });

  it("should return a 400 error for invalid Pokémon ID", async () => {
    const response = await request(app)
      .post("/api/favorites")
      .send({ id: "invalid" });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe(
      "Pokémon ID must be a positive integer"
    );
  });

  it("should return a 400 error when removing an invalid Pokémon ID", async () => {
    const response = await request(app).delete("/api/favorites/invalid");
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe(
      "Pokémon ID must be a positive integer"
    );
  });
});
