import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import { createRouter } from "next-connect";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const createMigrationHandler = (runMigrations) => async (request, response) => {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
      dbClient,
      dir: resolve("infra", "migrations"),
      direction: "up",
      dryRun: true,
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    return await runMigrations(defaultMigrationOptions, response);
  } finally {
    dbClient.end();
  }
};

const onNoMatchHandler = (request, response) => {
  const publicError = new MethodNotAllowedError();
  response.status(405).json(publicError);
};

const onErrorHandler = (error, request, response) => {
  const publicError = new InternalServerError({ cause: error });
  response.status(500).json(publicError);
};

const router = createRouter();

router.head(onNoMatchHandler);

router.get(
  createMigrationHandler(async (options, response) => {
    const migrations = await migrationRunner(options);
    return response.status(200).json(migrations);
  }),
);

router.post(
  createMigrationHandler(async (options, response) => {
    const migrations = await migrationRunner({ ...options, dryRun: false });
    const status = migrations.length > 0 ? 201 : 200;
    return response.status(status).json(migrations);
  }),
);

export default router.handler({
  onError: onErrorHandler,
  onNoMatch: onNoMatchHandler,
});
