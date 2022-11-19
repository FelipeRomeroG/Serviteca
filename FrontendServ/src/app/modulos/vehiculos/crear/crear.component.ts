import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/modelos/vehiculo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  fgValidator: FormGroup = this.fb.group({
    placa: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    color: ['', [Validators.required]],
    linea: ['', [Validators.required]],
    ano: ['', [Validators.required]],
    clase: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private vehiculoServicio: VehiculoService,
    private router: Router
    ) { }
    
  ngOnInit(): void {
  }
  crearVehiculo() {
    let vehiculo = new Vehiculo();
    vehiculo.PlacaVehiculo = this.fgValidator.controls["placa"].value;
    vehiculo.MarcaVehiculo = this.fgValidator.controls["marca"].value;
    vehiculo.ColorVehiculo = this.fgValidator.controls['color'].value;
    vehiculo.LineaVehiculo = this.fgValidator.controls["linea"].value;
    vehiculo.AnoVehiculo = this.fgValidator.controls["ano"].value;
    vehiculo.ClaseVehiculo = this.fgValidator.controls["clase"].value;
    this.vehiculoServicio.crearVehiculo(vehiculo).subscribe({
      next: (vehiculo) => { alert("Vehículo Grabado");this.router.navigate(["/vehiculos"]) },
      error: (error) => { alert("Error al Grabar Vehículo"); }
    })
  }
}