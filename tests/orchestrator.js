const retry = require('async-retry');

const waitAllServices = async () => {
  const waitWebServer = async () => {
    const fetchStatusPage = async () => {
      const response = await fetch("http://localhost:3030/api/v1/status");

      if (!response.ok) {
        throw new Error(
          `Web server not ready, status code: ${response.status}`,
        );
      }
    };

    await retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
  }

  await waitWebServer();
}

export default {
  waitAllServices,
}
