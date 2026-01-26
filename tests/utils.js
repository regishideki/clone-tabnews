import database from "infra/database.js";

const cleanDatabase = async () => {
  database.query("drop schema public cascade; create schema public;");
}

export {
  cleanDatabase
}
