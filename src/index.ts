import express from "express";
import { AddressInfo } from "net";
import { discartRouter, establishmentRouter } from "./controller/routes/establishmentRouter";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/establishment", establishmentRouter);
app.use("/discart", discartRouter);

const server = app.listen(3003, () => {
 if (server) {
  const address = server.address() as AddressInfo;
  console.log(`Servidor rodando em http://localhost:${address.port}`);
 } else {
  console.error(`Falha ao rodar o servidor.`);
 }
});  