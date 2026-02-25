import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.cleanDatabase();
  await orchestrator.waitAllServices();
});

describe("GET to /api/v1/status", () => {
  describe("when requesting by an anonymous user", () => {
    it("returns success and status message", async () => {
      const response = await fetch("http://localhost:3030/api/v1/status");
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      const parsedUpdatedAt = new Date(responseBody.updated_at);
      expect(responseBody.updated_at).toBe(parsedUpdatedAt.toISOString());
      const dependencies = responseBody.dependencies;
      const database = dependencies.database;
      expect(database.version).toBe("16.0");
      expect(database.max_connections).toBe(100);
      expect(database.opened_connections).toBe(1);
    });
  });
});
