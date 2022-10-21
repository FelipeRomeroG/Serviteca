import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  VentaServicio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteVentaServicioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VentaServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VentaServicio>,
  ): Promise<VentaServicio[]> {
    return this.clienteRepository.ventaServicios(id).find(filter);
  }

  @post('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'id'>,
  ): Promise<VentaServicio> {
    return this.clienteRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Cliente.VentaServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {partial: true}),
        },
      },
    })
    ventaServicio: Partial<VentaServicio>,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.clienteRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Cliente.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.clienteRepository.ventaServicios(id).delete(where);
  }
}
