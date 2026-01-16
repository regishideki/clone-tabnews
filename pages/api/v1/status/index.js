const getStatus = (req, res) => {
  res.status(200).json({ response: "OK. Não tem nada de errado aqui."});
}

export default getStatus
