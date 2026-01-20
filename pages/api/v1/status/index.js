import database from "infra/database.js";

const getStatus = async (req, res) => {
  const result = await database.query("select 1 + 1 as sum;");
  const updatedAt = new Date().toISOString();

  res.status(200).json({
    rows: result.rows,
    updated_at: updatedAt
  });
}

export default getStatus
