import { cleanDatabase } from "tests/utils.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await cleanDatabase();
  await orchestrator.waitAllServices();
});


["DELETE", "HEAD", "PUT", "PATCH", "OPTIONS", "TRACE"].forEach((method) => {
  test(`${method} /api/v1/migrations returns error and does not leak db connection`, async () => {
    const migrationResponse = await fetch(
      "http://localhost:3030/api/v1/migrations",
      {
        method,
      },
    );

    expect(migrationResponse.status).toBe(405);

    const statusResponse = await fetch("http://localhost:3030/api/v1/status");

    const statusResponseBody = await statusResponse.json();
    expect(statusResponseBody.dependencies.database.opened_connections).toBe(1);
  });
});
