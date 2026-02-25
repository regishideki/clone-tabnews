import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.cleanDatabase();
  await orchestrator.waitAllServices();
});

describe("POST to /api/v1/migrations", () => {
  describe("when requesting by an anonymous user", () => {
    describe("when there are migrations to be executed", () => {
      it("returns success and executes the migrations", async () => {
        const response = await fetch(
          "http://localhost:3030/api/v1/migrations",
          {
            method: "POST",
          },
        );
        const responseBody = await response.json();

        expect(response.status).toBe(201);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });
    });

    describe("when there are no migrations to be executed", () => {
      it("returns success and runs no migrations", async () => {
        await fetch("http://localhost:3030/api/v1/migrations", {
          method: "POST",
        });
        const response = await fetch(
          "http://localhost:3030/api/v1/migrations",
          {
            method: "POST",
          },
        );
        const responseBody = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBe(0);
      });
    });
  });
});
