import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/modelos/vehiculo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit{

  fgValidator: FormGroup = this.fb.group({
    id: ['',[Validators.required]],
    placa: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    color: ['', [Validators.required]],
    linea: ['', [Validators.required]],
    ano: ['', [Validators.required]],
    clase: ['', [Validators.required]],
  });

  id: String = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehiculoServicio:VehiculoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.cargarVehiculo();
  }

  cargarVehiculo(){
    this.vehiculoServicio.buscarVehiculo(this.id).subscribe(vehiculo =>{
      this.fgValidator.controls["id"].setValue(vehiculo.id);
      this.fgValidator.controls["placa"].setValue(vehiculo.PlacaVehiculo);
      this.fgValidator.controls["marca"].setValue(vehiculo.MarcaVehiculo);
      this.fgValidator.controls["color"].setValue(vehiculo.ColorVehiculo);
      this.fgValidator.controls["linea"].setValue(vehiculo.LineaVehiculo);
      this.fgValidator.controls["ano"].setValue(vehiculo.AnoVehiculo);
      this.fgValidator.controls["clase"].setValue(vehiculo.ClaseVehiculo);
    })

  }

  actualizarVehiculo(){
    let vehiculo = new Vehiculo();
    vehiculo.id = this.fgValidator.controls["id"].value;
    vehiculo.PlacaVehiculo = this.fgValidator.controls["placa"].value;
    vehiculo.MarcaVehiculo = this.fgValidator.controls["marca"].value;
    vehiculo.ColorVehiculo = this.fgValidator.controls["color"].value;
    vehiculo.LineaVehiculo = this.fgValidator.controls["linea"].value;
    vehiculo.AnoVehiculo = this.fgValidator.controls["ano"].value;
    vehiculo.ClaseVehiculo = this.fgValidator.controls["clase"].value;
   
    this.vehiculoServicio.actualizarVehiculo(vehiculo).subscribe({
      next: (vehiculo) => {
        alert("Vehículo Actualizado");
        this.router.navigate(["/vehiculos"]);
      },
      error: (error) => {alert("Error Modificando Vehículo");}
    })

  }

}