const retry = require("async-retry");

async function waitAllServices() {
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
}

const orchestrator = {
  waitAllServices,
};

export default orchestrator;
