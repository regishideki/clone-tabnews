const retry = require("async-retry");
import database from "infra/database.js";

const waitAllServices = async () => {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 200,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3030/api/v1/status");

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
};

export default orchestrator;
