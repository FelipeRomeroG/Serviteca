import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },

  { path: 'clientes', loadChildren: () => import('./modulos/clientes/clientes.module').then(x => x.ClientesModule) },
  { path: 'vehiculos', loadChildren: () => import('./modulos/vehiculos/vehiculos.module').then(x => x.VehiculosModule) },
  { path: 'ventaservicios', loadChildren: () => import('./modulos/ventaservicios/ventaservicios.module').then(x => x.VentaserviciosModule) },
  { path: 'servicios', loadChildren: () => import('./modulos/servicios/servicios.module').then(x => x.ServiciosModule) },
  { path: 'administradores', loadChildren: () => import('./modulos/administradores/administradores.module').then(x => x.AdministradoresModule) },
  { path: 'seguridad', loadChildren: () => import('./modulos/seguridad/seguridad.module').then(x => x.SeguridadModule) },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
