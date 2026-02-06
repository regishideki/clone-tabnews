import { Client } from "pg";

const query = async (queryObject) => {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const getNewClient = async () => {
  const connectionConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSslValues(),
  };

  const client = new Client(connectionConfig);
  await client.connect();

  return client;
};

const getSslValues = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production";
};

export default {
  query,
  getNewClient,
};
