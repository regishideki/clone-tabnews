import database from "infra/database.js";

const getStatus = async (req, res) => {
  const result = await database.query("select 1 + 1 as sum;");

  res.status(200).json({
    response: "OK. Não tem nada de errado aqui.",
    rows: result.rows
  });
}

export default getStatus
