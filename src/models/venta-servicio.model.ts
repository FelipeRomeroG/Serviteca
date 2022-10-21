import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Administrador} from './administrador.model';
import {Servicio} from './servicio.model';

@model()
export class VentaServicio extends Entity {
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
    type: 'date',
    required: true,
  })
  FechaServicio: string;

  @property({
    type: 'number',
    required: true,
  })
  ValorServicio: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Servicio)
  servicioId: string;

  constructor(data?: Partial<VentaServicio>) {
    super(data);
  }
}

export interface VentaServicioRelations {
  // describe navigational properties here
}

export type VentaServicioWithRelations = VentaServicio & VentaServicioRelations;
