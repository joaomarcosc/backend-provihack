import { FormSugestionInputDTO, FormSuportInputDTO } from './../business/entities/forms';
import { Request, Response } from "express";
import { CustomError } from "../business/error/CustomError";
import { IdGenerator } from "../business/services/IdGenerator";
import { FormBusiness } from "../business/FormBusiness";
import { FormDataBase } from "../data/FormDataBase";

const formBusiness = new FormBusiness(
 new IdGenerator(),
 new FormDataBase()
)

export class FormController {

 async createFormSugestion(req: Request, res: Response) {
  try {
   const form:FormSugestionInputDTO = {
    nameEstablishment: req.body.nameEstablishment,
    tel: req.body.tel,
    state: req.body.state,
    city: req.body.city,
    cep: req.body.cep,
    nameResponsive: req.body.nameResponsive,
    email: req.body.email
   }

   if(!form){
    throw new CustomError(404, "Faltou alguma informação")
   }

   await formBusiness.createFormSugestion(form)

   res.status(200).send("Informações guardadas com sucesso")
    
  } catch (error) {
   res
    .status(error.statusCode || 400)
    .send({ error: error.message });
  }
 }

 async createFormSuport(req: Request, res: Response) {
  try {

   const form:FormSuportInputDTO = {
    id: req.body.id,
    name: req.body.name,
    subject: req.body.subject,
    email: req.body.email,
    message: req.body.message
   }

   if(!form){
    throw new CustomError(404,"Faltou alguma informação")
   }

   if(!form){
    throw new CustomError(404, "Faltou alguma informação")
   }

   await formBusiness.createFormSuporrt(form)

   res.status(200).send("Informações guardadas com sucesso")

  } catch (error) {
   res
    .status(error.statusCode || 400)
    .send({ error: error.message });
  }
 }

}