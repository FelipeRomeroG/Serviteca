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
  Cliente,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioClienteController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof VentaServicio.prototype.id,
  ): Promise<Cliente> {
    return this.ventaServicioRepository.cliente(id);
  }
}
