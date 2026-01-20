test("GET /api/v1/status returns 200 and status message", async () => {
  const response = await fetch("http://localhost:3030/api/v1/status");
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  const parsedUpdatedAt = new Date(responseBody.updated_at);
  expect(responseBody.updated_at).toBe(parsedUpdatedAt.toISOString());
  expect(responseBody.dependencies.database.version).toBe("16.0")
});
