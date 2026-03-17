const retry = require("async-retry");
import database from "infra/database.js";

const webServerPort = process.env.PORT ?? 3030;
const webServerUrl = `http://localhost:${webServerPort}`;

const waitAllServices = async () => {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 200,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${webServerUrl}/api/v1/status`);

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
};

const cleanDatabase = async () => {
  await database.query("drop schema public cascade; create schema public;");
};

const orchestrator = {
  waitAllServices,
  cleanDatabase,
  webServerUrl,
};

export default orchestrator;
