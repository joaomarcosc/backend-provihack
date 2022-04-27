import { EstablishmentDataBase } from "../data/EstablishmentDataBase";
import { IdGenerator } from "./services/IdGenerator";
import { Establishment, EstablishmentInputDTO, EstablishmentInputDataBase, DiscardInputDTO, EstabDiscarDTO } from "./entities/establishment";

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
   howToDiscard: establishment.howToDiscard,
   howDoesDiscart: establishment.howDoesDiscart
  }

  await this.establishmentDataBase.createEstablishment(establishmentDataBase)

  for (let i = 0; i < establishment.discard.length; i++) {
   let res = await this.establishmentDataBase.getDiscardByName(establishment.discard[i])
   let id_estabDiscar = this.idGenerator.generate()
   if (!res) {

    let id_Discard = this.idGenerator.generate()

    let discard: DiscardInputDTO = {
     id: id_Discard,
     name: establishment.discard[i]
    }

    let estabDisca: EstabDiscarDTO = {
     id: id_estabDiscar,
     id_establishment: id_establishment,
     id_discard: id_Discard
    }

    await this.establishmentDataBase.createDiscard(discard)
    await this.establishmentDataBase.createEstabDiscar(estabDisca)
   } else {

    let estabDisca: EstabDiscarDTO = {
     id: id_estabDiscar,
     id_establishment: id_establishment,
     id_discard: res.id
    }

    await this.establishmentDataBase.createEstabDiscar(estabDisca)
   }
  }
 }

 async getEstablishmentById(id: string): Promise<Establishment | undefined> {
  let establishment = await this.establishmentDataBase.getEstablishementById(id)
  let discard: string[] = []
  if (!establishment) {
   return undefined
  }

  if (establishment) {
   const estabDiscard = await this.establishmentDataBase.getEstabDiscaByIdEstablishment(id)

   if (estabDiscard) {
    for (let i = 0; i < estabDiscard.length; i++) {
     let disc = await this.establishmentDataBase.getDiscardById(estabDiscard[i].id_discard)
     if (disc) {
      discard.push(disc.name)
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
    discard,
    establishment.howToDiscard,
    establishment.howDoesDiscart
   )

   return res
  }
 }

 async getEstablishmentByDiscard(nameDiscard: string): Promise<Establishment[] | undefined> {
  let discard = await this.establishmentDataBase.getDiscardByName(nameDiscard)
  let establishments: Establishment[] = []

  if (!discard) {
   return undefined
  }

  if (discard) {
   const estabDiscard = await this.establishmentDataBase.getEstabDiscaByIdEstablishment(discard.id)

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

}