export class Establishment {
 constructor(
  public readonly id: string,
  public readonly name: string,
  public readonly state: string,
  public readonly city: string,
  public readonly cep: string,
  public readonly adress: string,
  public readonly tel: string,
  public readonly workingTime: string,
  public readonly discart: string[],
  public readonly howToDiscart: string,
  public readonly howDoesDiscart: string

 ) { }

}

export interface EstablishmentInputDTO {
 name: string,
 state: string,
 city: string,
 cep: string,
 adress: string,
 tel: string,
 workingTime: string,
 discart: string[],
 howToDiscart: string,
 howDoesDiscart: string
}

export interface EstablishmentInputDataBase {
 id: string
 name: string,
 state: string,
 city: string,
 cep: string,
 adress: string,
 tel: string,
 workingTime: string,
 howToDiscart: string,
 howDoesDiscart: string
}




export interface DiscartInputDTO {
 id: string,
 name: string
}

export interface EstabDiscarDTO {
 id: string,
 id_establishment: string,
 id_discart: string
}