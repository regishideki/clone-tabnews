import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.cleanDatabase();
  await orchestrator.waitAllServices();
});

["DELETE", "HEAD", "PUT", "PATCH", "OPTIONS"].forEach((method) => {
  describe(`${method} to /api/v1/migrations`, () => {
    describe("when requesting by an anonymous user", () => {
      it("returns error and does not leak db connection", async () => {
        const migrationResponse = await fetch(
          "http://localhost:3030/api/v1/migrations",
          {
            method,
          },
        );

        expect(migrationResponse.status).toBe(405);

        const statusResponse = await fetch(
          "http://localhost:3030/api/v1/status",
        );

        const statusResponseBody = await statusResponse.json();
        expect(
          statusResponseBody.dependencies.database.opened_connections,
        ).toBe(1);
      });
    });
  });
});
