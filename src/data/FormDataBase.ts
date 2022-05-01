import { CustomError } from '../business/error/CustomError';
import { FormSugestionInputDTO, FormSuportInputDTO } from './../business/entities/forms';
import { BaseDatabase } from './BaseDatabase';

export class FormDataBase extends BaseDatabase {

 private static TABLE_SUGESTION = "sugestion";
 private static TABLE_SUPORT = "suport";

 public async createFormSugestion(form: FormSugestionInputDTO) {
  try {
   await BaseDatabase.connection
    .insert({
     nameEstablishment: form.nameEstablishment,
     tel: form.tel,
     state: form.state,
     city: form.city,
     cep: form.cep,
     nameResponsive: form.nameResponsive,
     email: form.email
    })
    .into(FormDataBase.TABLE_SUGESTION)
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Form Sugestion")
  }
 }

 public async createFormSuport(form: FormSuportInputDTO) {
  try {
   await BaseDatabase.connection
    .insert({
     id: form.id,
     name: form.name,
     subject: form.subject,
     email: form.email,
     message: form.message
    })
    .into(FormDataBase.TABLE_SUPORT)
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Form Suport")
  }
 }
}