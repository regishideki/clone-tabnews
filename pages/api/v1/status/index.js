import database from "infra/database.js";

const getStatus = async (req, res) => {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("show server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query("show max_connections;");
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  // const databaseOpenedConnectionsResult = await database.query("select count(*)::int from pg_stat_activity where datname = 'postgres' and state='active';");
  const databaseOpenedConnectionsResult = await database.query({
    text: "select count(*)::int from pg_stat_activity where datname = $1 and state = $2;",
    values: [process.env.POSTGRES_DATABASE, "active"]
  });
  console.log(databaseOpenedConnectionsResult)
  const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      }
    },
  });
}

export default getStatus
