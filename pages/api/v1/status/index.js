import database from "infra/database.js";

const getStatus = async (req, res) => {
  const versionResult = await database.query("show server_version;");
  const versionValue = versionResult.rows[0].server_version;
  const updatedAt = new Date().toISOString();

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionValue
      }
    },
  });
}

export default getStatus
