import database from "infra/database.js";

const cleanDatabase = async () => {
  await database.query("drop schema public cascade; create schema public;");
}

export {
  cleanDatabase
}
