const { exec } = require("node:child_process");

const checkPostgres = () => {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    (error, stdout, stderr) => {
      if (stdout.search("accepting connections") === -1) {
        process.stdout.write(".");

        checkPostgres();

        return;
      }
      console.log("\n🟢 Postgres está aceitando conexões");
    },
  );
};

console.log("🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
