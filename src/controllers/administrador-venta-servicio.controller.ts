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
  Administrador,
  VentaServicio,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorVentaServicioController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Administrador has many VentaServicio',
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
    return this.administradorRepository.ventaServicios(id).find(filter);
  }

  @post('/administradors/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'id'>,
  ): Promise<VentaServicio> {
    return this.administradorRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/administradors/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Administrador.VentaServicio PATCH success count',
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
    return this.administradorRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/administradors/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Administrador.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.administradorRepository.ventaServicios(id).delete(where);
  }
}
