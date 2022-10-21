import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Vehiculo extends Entity {
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
  PlacaVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  MarcaVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  ColorVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  LineaVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  AnoVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  ClaseVehiculo: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
