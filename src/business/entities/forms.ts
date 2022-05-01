export class FormSugestion {
 constructor(
  public readonly id: string,
  public readonly nameEstablishment: string,
  public readonly tel: string,
  public readonly state: string,
  public readonly city: string,
  public readonly cep: string,
  public readonly nameResponsive: string,
  public readonly email: string
 ) { }
}

export class FormSuport {
 constructor(
  public readonly id: string,
  public readonly name: string,
  public readonly subject: string,
  public readonly email: string,
  public readonly message: string
 ) { }
}

export interface FormSugestionInputDTO {
 nameEstablishment: string,
 tel: string,
 state: string,
 city: string,
 cep: string,
 nameResponsive: string,
 email: string
}

export interface FormSuportInputDTO {
 name: string,
 subject: string,
 email: string,
 message: string
}