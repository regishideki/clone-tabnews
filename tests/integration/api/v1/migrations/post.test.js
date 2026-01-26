import { cleanDatabase } from "tests/utils.js";

beforeAll(cleanDatabase);

test("POST /api/v1/migrations returns 200 and status message", async () => {
  const response1 = await fetch("http://localhost:3030/api/v1/migrations", {
    method: "POST",
  });
  const response1Body = await response1.json();

  expect(response1.status).toBe(201);
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3030/api/v1/migrations", {
    method: "POST",
  });
  const response2Body = await response2.json();

  expect(response2.status).toBe(200);
  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});
