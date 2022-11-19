import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../modelos/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  url: string = "http://localhost:3000";
  // Poner acá la de heroku si se requiere

  constructor(private http: HttpClient) { }

  obtenerVehiculos(): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${this.url}/vehiculos`);
  }

  crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`${this.url}/vehiculos`,vehiculo);
  }

  buscarVehiculo(id: String): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(`${this.url}/vehiculos/${id}`);
  }

  actualizarVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.put<Vehiculo>(`${this.url}/vehiculos/${vehiculo.id}`, vehiculo); 
  }

  eliminarVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.delete(`${this.url}/vehiculos/${vehiculo.id}`);
  }
}

