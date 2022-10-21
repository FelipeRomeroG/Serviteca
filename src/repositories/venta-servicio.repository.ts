import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VentaServicio, VentaServicioRelations, Cliente, Administrador, Servicio} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AdministradorRepository} from './administrador.repository';
import {ServicioRepository} from './servicio.repository';

export class VentaServicioRepository extends DefaultCrudRepository<
  VentaServicio,
  typeof VentaServicio.prototype.id,
  VentaServicioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof VentaServicio.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof VentaServicio.prototype.id>;

  public readonly servicio: BelongsToAccessor<Servicio, typeof VentaServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(VentaServicio, dataSource);
    this.servicio = this.createBelongsToAccessorFor('servicio', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
