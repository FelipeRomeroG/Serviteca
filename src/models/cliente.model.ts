import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {VentaServicio} from './venta-servicio.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  IdentificacionCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreCompletoCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  TelefonoCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  CorreoCliente: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
