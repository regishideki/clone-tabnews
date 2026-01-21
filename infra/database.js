import { Client } from 'pg';

const query = async (queryObject) => {
  const connectionConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  }
  console.log("Connection config:", connectionConfig)

  const client = new Client(connectionConfig);

  try {
    await client.connect();

    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query
}
