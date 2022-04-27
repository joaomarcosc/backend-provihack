import { BaseDatabase } from "./BaseDatabase";
import { EstablishmentInputDataBase, Establishment, EstablishmentInputDTO, DiscardInputDTO, EstabDiscarDTO } from "../business/entities/establishment";
import { CustomError } from "../business/error/CustomError"

export class EstablishmentDataBase extends BaseDatabase {

 private static TABLE_ESTABLISHMENT = "establishment";
 private static TABLE_DISCARD = "discard";
 private static TABLE_ESTAB_DISCAR = "estab_discar";

 public async createEstablishment(
  establishment: EstablishmentInputDataBase
 ): Promise<void> {
  try {
   await BaseDatabase.connection
    .insert({
     establishment
    })
    .into(EstablishmentDataBase.TABLE_ESTABLISHMENT)
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Establishment")
  }
 }

 public async createDiscard(
  discard: DiscardInputDTO
 ): Promise<void> {
  try {
   await BaseDatabase.connection
    .insert({
     discard
    })
    .into(EstablishmentDataBase.TABLE_DISCARD)

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Discard")
  }
 }

 public async createEstabDiscar(
  estabDiscar: EstabDiscarDTO
 ): Promise<void> {
  try {
   await BaseDatabase.connection
    .insert({
     estabDiscar
    })
    .into(EstablishmentDataBase.TABLE_ESTAB_DISCAR)

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Establishment Discard")
  }
 }

 public async getEstablishementById(
  id: string
 ): Promise<EstablishmentInputDataBase | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_ESTABLISHMENT)
    .where({ id: id })

   let res: EstablishmentInputDataBase[] = result.map((est: any) => {
    return {
     id: est.id,
     name: est.name,
     state: est.estate,
     city: est.city,
     cep: est.city,
     adress: est.adress,
     tel: est.tel,
     workingTime: est.workingTime,
     howToDiscard: est.howToDiscard,
     howDoesDiscart: est.howDoesDiscart
    }
   })

   return res[0]
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get Establishment")
  }
 }

 public async getEstablishmentByEstate(
  state: string
 ): Promise<EstablishmentInputDataBase[] | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_ESTABLISHMENT)
    .where({ state: state })

   let res: EstablishmentInputDataBase[] = result.map((est: any) => {
    return {
     id: est.id,
     name: est.name,
     estate: est.estate,
     city: est.city,
     cep: est.city,
     adress: est.adress,
     tel: est.tel,
     workingTime: est.workingTime,
     howToDiscard: est.howToDiscard,
     howDoesDiscart: est.howDoesDiscart
    }
   })

   return res

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get Establishment")
  }
 }

 public async getDiscardById(
  id: string
 ): Promise<DiscardInputDTO | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_DISCARD)
    .where({ id: id })

   let res: DiscardInputDTO[] = result.map((disc: any) => {
    return {
     id: disc.id,
     name: disc.name
    }
   })

   return res[0]

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get Establishment")
  }
 }

 public async getEstabDiscaByIdDiscard(
  id_discard: string
 ): Promise<EstabDiscarDTO[] | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_ESTAB_DISCAR)
    .where({ id_discard: id_discard })

   let res: EstabDiscarDTO[] = result.map((estabDisc: any) => {
    return {
     id: estabDisc.id,
     id_establishment: estabDisc.id_establishment,
     id_discard: estabDisc.id_discard
    }
   })

   return res
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get Establishment")
  }
 }

 public async getEstabDiscaByIdEstablishment(
  id_establishment: string
 ): Promise<EstabDiscarDTO[] | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_ESTAB_DISCAR)
    .where({ id_establishment: id_establishment })

   let res: EstabDiscarDTO[] = result.map((estabDisc: any) => {
    return {
     id: estabDisc.id,
     id_establishment: estabDisc.id_establishment,
     id_discard: estabDisc.id_discard
    }
   })

   return res
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get Establishment")
  }
 }

}