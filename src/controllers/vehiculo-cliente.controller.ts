import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Cliente,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoClienteController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Cliente> {
    return this.vehiculoRepository.cliente(id);
  }
}
