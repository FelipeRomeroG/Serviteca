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
  Servicio,
  VentaServicio,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioVentaServicioController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Servicio has many VentaServicio',
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
    return this.servicioRepository.ventaServicios(id).find(filter);
  }

  @post('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'id'>,
  ): Promise<VentaServicio> {
    return this.servicioRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Servicio.VentaServicio PATCH success count',
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
    return this.servicioRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Servicio.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.servicioRepository.ventaServicios(id).delete(where);
  }
}
