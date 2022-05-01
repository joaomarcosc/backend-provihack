import { FormSugestionInputDTO, FormSuportInputDTO } from './entities/forms';
import { FormDataBase } from "../data/FormDataBase";
import { IdGenerator } from "./services/IdGenerator";

export class FormBusiness {
 constructor(
  private idGenerator: IdGenerator,
  private formDataBase: FormDataBase
 ) { }

 async createFormSugestion(form:FormSugestionInputDTO) {
  const id = this.idGenerator.generate();
  await this.formDataBase.createFormSugestion(form)
 }

 async createFormSuporrt(form:FormSuportInputDTO) {
  const id = this.idGenerator.generate();
  await this.formDataBase.createFormSuport(form)
 }
 
}