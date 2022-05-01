import { FormController } from './../FormController';
import express from "express";

export const  formRouter = express.Router()
export const discartRouter = express.Router()

const formController = new FormController()

formRouter.post('/sugestion', formController.createFormSugestion)
formRouter.post('/suport', formController.createFormSuport)

