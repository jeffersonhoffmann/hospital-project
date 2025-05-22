import { Endereco } from "./endereco.model";

export enum Perfil {
  CLIENTE = 'cliente',
  FUNCIONARIO = 'funcionario'
}

export class Usuario {
  constructor (
    public id?: number,
    public cpf?: string,
    public nome?: string,
    public email?: string,
    public senha?: string,
    public telefone?: string,
    public endereco?: string,
    public perfil?: Perfil,
    public quantidadePedidos?: string,
    public valorReceita?: string,
  ){}
}