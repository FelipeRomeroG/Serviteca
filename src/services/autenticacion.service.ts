import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Administrador} from '../models';
import {AdministradorRepository} from '../repositories';


const generador = require('password-generator'); // inporta modulo de generación de password
const cryptoJS = require('crypto-js'); //importa encripcion de clave
const jwt = require('jsonwebtoken'); // importa token desde jsonwebtoken lib

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository
  ) { }

  /*
   * Add service methods here
   */

  // Es una clase acá van métodos o logica de negocio
  // metodo que invoca la constante generador para crear una clave de 8 caracteres
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }
  // Método que encrypta la clave aleatoria creada
  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  // Funcion que identifica el administrador o usuario
  IdentificarAdmin(usuario: string, clave: string) {
    try {
      let p = this.administradorRepository.findOne({where: {Correo: usuario, password: clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Generacion de Token usando JWT()
  GenerarTokenJWT(administrador: Administrador) {
    let token = jwt.sign({
      data: {
        id: administrador.id,
        correo: administrador.Correo,
        nombre: administrador.Nombres + " " + administrador.Apellidos
      }
    },
      Llaves.llaveJWT);
    return token;
  }

  // Validar el Token jwt()

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.llaveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
