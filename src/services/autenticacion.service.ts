import {injectable, /* inject, */ BindingScope} from '@loopback/core';

const generador = require('password-generator'); // inporta modulo de generación de password
const cryptoJS =require('crypto-js'); //importa encripcion de clave

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  // Es una clase acá van métodos o logica de negocio
  // metodo que invoca la constante generador para crear una clave de 8 caracteres
  GenerarClave(){
    let clave=generador(8,false);
    return clave;
  }
  // Método que encrypta la clave aleatoria creada
  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
}
