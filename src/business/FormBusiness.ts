import { FormSugestion, FormSugestionInputDTO, FormSuport, FormSuportInputDTO } from './entities/forms';
import { FormDataBase } from "../data/FormDataBase";
import { IdGenerator } from "./services/IdGenerator";

export class FormBusiness {
 constructor(
  private idGenerator: IdGenerator,
  private formDataBase: FormDataBase
 ) { }

 async createFormSugestion(form: FormSugestionInputDTO) {
  const id = this.idGenerator.generate();
  let newForm = new FormSugestion(
   id,
   form.nameEstablishment,
   form.tel,
   form.state,
   form.city,
   form.cep,
   form.nameResponsive,
   form.email
  )
  await this.formDataBase.createFormSugestion(newForm)
 }

 async createFormSuporrt(form: FormSuportInputDTO) {
  const id = this.idGenerator.generate();
  let newForm = new FormSuport(
  id,
  form.name,
  form.subject,
  form.email,
  form.message
  )
  
  await this.formDataBase.createFormSuport(newForm)
 }

}