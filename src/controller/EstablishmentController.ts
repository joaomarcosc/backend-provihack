import { EstablishmentInputDTO } from './../business/entities/establishment';
import { Request, Response } from "express";
import { CustomError } from "../business/error/CustomError";
import { IdGenerator } from "../business/services/IdGenerator";
import { EstablishmentBusiness } from "../business/EstablishmentBusiness";
import { EstablishmentDataBase } from "../data/EstablishmentDataBase";

const establishmentBusiness = new EstablishmentBusiness(
 new IdGenerator(),
 new EstablishmentDataBase(),
)

export class EstablishmentController {

 async createEstablishment(req: Request, res: Response) {
  try {
   const estab: EstablishmentInputDTO = {
    name: req.body.name,
    state: req.body.state,
    city: req.body.city,
    cep: req.body.cep,
    adress: req.body.adress,
    tel: req.body.tel,
    workingTime: req.body.workingTime,
    discart: req.body.discart,
    howToDiscart: req.body.howToDiscart,
    howDoesDiscart: req.body.howDoesDiscart
   }

   if (!estab) {
    throw new CustomError(404, "Faltou alguma informação do estabelecimento")
   }

   await establishmentBusiness.createEstablishment(estab)

   res.status(200).send("Estabelecimento criado com sucesso")

  } catch (error) {
   res
    .status(error.statusCode || 400)
    .send({ error: error.message });
  }
 }

 async getEstablishmentById(req: Request, res: Response) {
  try {
   const id = req.query.id as string

   if (!id) {
    throw new CustomError(404, "Faltou id")
   }

   let response = await establishmentBusiness.getEstablishmentById(id)

   if (!response) {
    throw new CustomError(402, "Estabelecimento não encontrado")
   }

   res.status(200).send({ data: response })

  } catch (error) {
   res
    .status(error.statusCode || 400)
    .send({ error: error.message });
  }
 }

 async getEstablishmentByDiscart(req: Request, res: Response) {
  try {
   let id = req.query.id as string

   if (!id) {
    throw new CustomError(404, "Faltou o id")
   }

   let response = await establishmentBusiness.getEstablishmentByDiscart(id)

   if (!response) {
    throw new CustomError(402, "Estabelecimentos não encontrados")
   }

   res.status(200).send({ data: response })

  } catch (error) {
   res
    .status(error.statusCode || 400)
    .send({ error: error.message });
  }
 }

 async getDiscarts(req: Request, res: Response) {
  try {
   let response = await establishmentBusiness.getDiscarts()

   if (!response) {
    throw new CustomError(402, "Descartes não encontrados")
   }

   res.status(200).send({ data: response })

  } catch (error) {
   res
    .status(error.statusCode || 400)
    .send({ error: error.message });
  }
 }

}