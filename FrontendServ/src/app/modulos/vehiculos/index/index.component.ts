import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/modelos/vehiculo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  vehiculos: Vehiculo[]=[];
  constructor(private vehiculoServicio: VehiculoService) { }
  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(){
    this.vehiculoServicio.obtenerVehiculos().subscribe(vehiculos => this.vehiculos = vehiculos);
  }
}
