import express from "express";

const app = express();

app.listen(3000, () => {
  const message = "App rodando na porta 3000...";

  console.log(message);
});
