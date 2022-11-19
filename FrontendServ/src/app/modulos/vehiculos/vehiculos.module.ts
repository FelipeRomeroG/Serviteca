import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { IndexComponent } from './index/index.component';
import { CrearComponent } from './crear/crear.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  declarations: [
    IndexComponent,
    CrearComponent,
    EditarComponent,
  ],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class VehiculosModule { }
