import { Ventas } from './../models/venta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  basePath: string= environment.basePath;
  constructor(private http: HttpClient) { }

  getVenta(){
    return this.http.get<Ventas[]>(this.basePath);

  }

  newVenta(ventas:Ventas){
    return this.http.post<Ventas>(this.basePath, ventas);
  }
}