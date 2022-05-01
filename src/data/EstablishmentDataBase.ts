import { BaseDatabase } from "./BaseDatabase";
import { EstablishmentInputDataBase, DiscartInputDTO, EstabDiscarDTO } from "../business/entities/establishment";
import { CustomError } from "../business/error/CustomError"

export class EstablishmentDataBase extends BaseDatabase {

 private static TABLE_ESTABLISHMENT = "establishment";
 private static TABLE_DISCART = "discart";
 private static TABLE_ESTAB_DISCAR = "estab_discar";

 public async createEstablishment(
  establishment: EstablishmentInputDataBase
 ): Promise<void> {
  try {
   await BaseDatabase.connection
    .insert({
     id: establishment.id,
     name: establishment.name,
     state: establishment.state,
     city: establishment.city,
     cep: establishment.cep,
     adress: establishment.adress,
     tel: establishment.tel,
     workingTime: establishment.workingTime,
     howToDiscart: establishment.howToDiscart,
     howDoesDiscart: establishment.howDoesDiscart
    })
    .into(EstablishmentDataBase.TABLE_ESTABLISHMENT)
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Establishment3")
  }
 }

 public async createDiscart(
  discart: DiscartInputDTO
 ): Promise<void> {
  try {
   await BaseDatabase.connection
    .insert({
     id:discart.id,
     name:discart.name
    })
    .into(EstablishmentDataBase.TABLE_DISCART)

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Discart")
  }
 }

 public async createEstabDiscar(
  estabDiscar: EstabDiscarDTO
 ): Promise<void> {
  try {
   await BaseDatabase.connection
    .insert({
     id:estabDiscar.id,
     id_establishment:estabDiscar.id_establishment,
     id_discart:estabDiscar.id_discart
    })
    .into(EstablishmentDataBase.TABLE_ESTAB_DISCAR)

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create Establishment Discart")
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
     howToDiscart: est.howToDiscart,
     howDoesDiscart: est.howDoesDiscart
    }
   })

   return res[0]
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get Establishment by id")
  }
 }

 public async getDiscart(): Promise<DiscartInputDTO[]> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_DISCART)

   let res: DiscartInputDTO[] = result.map((disc: any) => {
    return {
     id: disc.id,
     name: disc.name
    }
   })

   return res

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get descart")
  }
 }

 public async getDiscartById(
  id: string
 ): Promise<DiscartInputDTO | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_DISCART)
    .where({ id: id })

   let res: DiscartInputDTO[] = result.map((disc: any) => {
    return {
     id: disc.id,
     name: disc.name
    }
   })

   return res[0]

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get discart by id")
  }
 }

 public async getDiscartByName(
  name: string
 ): Promise<DiscartInputDTO | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_DISCART)
    .where({ name: name })

   let res: DiscartInputDTO[] = result.map((disc: any) => {
    return {
     id: disc.id,
     name: disc.name
    }
   })

   return res[0]

  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get discart by name")
  }
 }

 public async getEstabDiscaByIdDiscart(
  id_discart: string
 ): Promise<EstabDiscarDTO[] | undefined> {
  try {
   const result = await BaseDatabase.connection
    .select("*")
    .from(EstablishmentDataBase.TABLE_ESTAB_DISCAR)
    .where({ id_discart: id_discart })

   let res: EstabDiscarDTO[] = result.map((estabDisc: any) => {
    return {
     id: estabDisc.id,
     id_establishment: estabDisc.id_establishment,
     id_discart: estabDisc.id_discart
    }
   })

   return res
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get estabDiscar by Id Discart")
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
     id_discart: estabDisc.id_discart
    }
   })

   return res
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in get estabDiscar by Id establishment ")
  }
 }

}