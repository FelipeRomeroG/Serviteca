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
  Administrador,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioAdministradorController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof VentaServicio.prototype.id,
  ): Promise<Administrador> {
    return this.ventaServicioRepository.administrador(id);
  }
}
