import { EstablishmentController } from "../EstablishmentController";
import express from "express";

export const  establishmentRouter = express.Router()
export const discartRouter = express.Router()

const establishmentController = new EstablishmentController()

establishmentRouter.post('/', establishmentController.createEstablishment)
establishmentRouter.get('/id', establishmentController.getEstablishmentById)
establishmentRouter.get('/discart', establishmentController.getEstablishmentByDiscart)

discartRouter.get('/', establishmentController.getDiscarts)