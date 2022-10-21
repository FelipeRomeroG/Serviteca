import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VentaServicio} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository : VentaServicioRepository,
  ) {}

  @post('/venta-servicios')
  @response(200, {
    description: 'VentaServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    ventaServicio: Omit<VentaServicio, 'id'>,
  ): Promise<VentaServicio> {
    return this.ventaServicioRepository.create(ventaServicio);
  }

  @get('/venta-servicios/count')
  @response(200, {
    description: 'VentaServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VentaServicio) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.ventaServicioRepository.count(where);
  }

  @get('/venta-servicios')
  @response(200, {
    description: 'Array of VentaServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VentaServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VentaServicio) filter?: Filter<VentaServicio>,
  ): Promise<VentaServicio[]> {
    return this.ventaServicioRepository.find(filter);
  }

  @patch('/venta-servicios')
  @response(200, {
    description: 'VentaServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {partial: true}),
        },
      },
    })
    ventaServicio: VentaServicio,
    @param.where(VentaServicio) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.ventaServicioRepository.updateAll(ventaServicio, where);
  }

  @get('/venta-servicios/{id}')
  @response(200, {
    description: 'VentaServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VentaServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VentaServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<VentaServicio>
  ): Promise<VentaServicio> {
    return this.ventaServicioRepository.findById(id, filter);
  }

  @patch('/venta-servicios/{id}')
  @response(204, {
    description: 'VentaServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {partial: true}),
        },
      },
    })
    ventaServicio: VentaServicio,
  ): Promise<void> {
    await this.ventaServicioRepository.updateById(id, ventaServicio);
  }

  @put('/venta-servicios/{id}')
  @response(204, {
    description: 'VentaServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ventaServicio: VentaServicio,
  ): Promise<void> {
    await this.ventaServicioRepository.replaceById(id, ventaServicio);
  }

  @del('/venta-servicios/{id}')
  @response(204, {
    description: 'VentaServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ventaServicioRepository.deleteById(id);
  }
}
