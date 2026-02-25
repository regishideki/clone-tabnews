import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.cleanDatabase();
  await orchestrator.waitAllServices();
});

describe("GET to /api/v1/migrations", () => {
  describe("when requesting by an anonymous user", () => {
    it("returns success and pending migrations", async () => {
      const response = await fetch("http://localhost:3030/api/v1/migrations");
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
