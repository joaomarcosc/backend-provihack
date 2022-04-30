import express from "express";
import { AddressInfo } from "net";
import { discartRouter, establishmentRouter } from "./controller/routes/establishmentRouter";

const PORT = process.env.PORT

const app = express();

app.use(express.json());

app.use("/establishment", establishmentRouter);
app.use("/discart", discartRouter);

const server = app.listen(PORT, () => {
 if (server) {
  const address = server.address() as AddressInfo;
  console.log(`Servidor rodando em http://localhost:${address.port}`);
 } else {
  console.error(`Falha ao rodar o servidor.`);
 }
});  