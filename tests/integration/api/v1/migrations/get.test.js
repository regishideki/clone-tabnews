import { cleanDatabase } from "tests/utils.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await cleanDatabase();
  await orchestrator.waitAllServices();
});


test("GET /api/v1/migrations returns 200 and status message", async () => {
  const response = await fetch("http://localhost:3030/api/v1/migrations");
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
