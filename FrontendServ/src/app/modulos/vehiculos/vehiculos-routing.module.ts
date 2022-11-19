import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path: '', component:IndexComponent},
  {path: 'crear', component: CrearComponent},
  {path: 'editar/:id', component: EditarComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
