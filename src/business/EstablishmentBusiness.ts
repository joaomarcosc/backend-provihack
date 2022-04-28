import { EstablishmentDataBase } from "../data/EstablishmentDataBase";
import { IdGenerator } from "./services/IdGenerator";
import { Establishment, EstablishmentInputDTO, EstablishmentInputDataBase, DiscartInputDTO, EstabDiscarDTO } from "./entities/establishment";

export class EstablishmentBusiness {
 constructor(
  private idGenerator: IdGenerator,
  private establishmentDataBase: EstablishmentDataBase
 ) { }

 async createEstablishment(establishment: EstablishmentInputDTO) {
  const id_establishment = this.idGenerator.generate();

  let establishmentDataBase: EstablishmentInputDataBase = {
   id: id_establishment,
   name: establishment.name,
   state: establishment.state,
   city: establishment.city,
   cep: establishment.cep,
   adress: establishment.adress,
   tel: establishment.tel,
   workingTime: establishment.workingTime,
   howToDiscart: establishment.howToDiscart,
   howDoesDiscart: establishment.howDoesDiscart
  }

  await this.establishmentDataBase.createEstablishment(establishmentDataBase)

  for (let i = 0; i < establishment.discart.length; i++) {
   let res = await this.establishmentDataBase.getDiscartByName(establishment.discart[i])
   let id_estabDiscar = this.idGenerator.generate()
   if (!res) {

    let id_Discart = this.idGenerator.generate()

    let discart: DiscartInputDTO = {
     id: id_Discart,
     name: establishment.discart[i]
    }

    let estabDisca: EstabDiscarDTO = {
     id: id_estabDiscar,
     id_establishment: id_establishment,
     id_discart: id_Discart
    }

    await this.establishmentDataBase.createDiscart(discart)
    await this.establishmentDataBase.createEstabDiscar(estabDisca)
   } else {

    let estabDisca: EstabDiscarDTO = {
     id: id_estabDiscar,
     id_establishment: id_establishment,
     id_discart: res.id
    }

    await this.establishmentDataBase.createEstabDiscar(estabDisca)
   }
  }
 }

 async getEstablishmentById(id: string): Promise<Establishment | undefined> {
  let establishment = await this.establishmentDataBase.getEstablishementById(id)
  let discart: string[] = []
  if (!establishment) {
   return undefined
  }

  if (establishment) {
   const estabDiscard = await this.establishmentDataBase.getEstabDiscaByIdEstablishment(id)

   if (estabDiscard) {
    for (let i = 0; i < estabDiscard.length; i++) {
     let disc = await this.establishmentDataBase.getDiscartById(estabDiscard[i].id_discart)
     if (disc) {
      discart.push(disc.name)
     }
    }
   }

   let res = new Establishment(
    establishment.id,
    establishment.name,
    establishment.state,
    establishment.city,
    establishment.cep,
    establishment.adress,
    establishment.tel,
    establishment.workingTime,
    discart,
    establishment.howToDiscart,
    establishment.howDoesDiscart
   )

   return res
  }
 }

 async getEstablishmentByDiscart(id: string): Promise<Establishment[] | undefined> {
  let discart = await this.establishmentDataBase.getDiscartById(id)
  let establishments: Establishment[] = []

  if (!discart) {
   return undefined
  }

  if (discart) {
   const estabDiscard = await this.establishmentDataBase.getEstabDiscaByIdDiscart(discart.id)

   if (estabDiscard) {
    for (let i = 0; i < estabDiscard.length; i++) {
     let estab = await this.getEstablishmentById(estabDiscard[i].id_establishment)
     if (estab) {
      establishments.push(estab)
     }
    }
   }
   return establishments
  }
 }

 async getDiscarts() {
  let res = await this.establishmentDataBase.getDiscart()

  return res
 }
}