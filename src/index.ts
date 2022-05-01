import cors from "cors";
import express from "express";
import { AddressInfo } from "net";
import { discartRouter, establishmentRouter } from "./controller/routes/establishmentRouter";
import { formRouter } from "./controller/routes/FormRouter";

const PORT = process.env.PORT

const app = express();

app.use(cors());

app.use(express.json());

app.use("/establishment", establishmentRouter);
app.use(formRouter)

const server = app.listen(PORT, () => {
 if (server) {
  const address = server.address() as AddressInfo;
  console.log(`Servidor rodando em http://localhost:${address.port}`);
 } else {
  console.error(`Falha ao rodar o servidor.`);
 }
});  

