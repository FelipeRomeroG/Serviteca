import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VentaServicio,
  Servicio,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioServicioController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/servicio', {
    responses: {
      '200': {
        description: 'Servicio belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async getServicio(
    @param.path.string('id') id: typeof VentaServicio.prototype.id,
  ): Promise<Servicio> {
    return this.ventaServicioRepository.servicio(id);
  }
}
