import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = 'http://localhost:8080/vehicles';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  public car: Vehicle;

  constructor(private data: HttpClient) { }

  getVehicles() {
    return this.data.get<Vehicle[]>(this.baseUrl + '/vehicles');
  }

  countVehiclesBySchool(id: number) {
    return this.data.get<number>(this.baseUrl + '/count/' + id);
  }

  getVehiclesBySchool(id: number) {
    return this.data.get<Vehicle[]>(this.baseUrl + '/vehicles/' + id);
  }
  getVehicle(id: number) {
    return this.data.get<Vehicle>(this.baseUrl + '/vehicle/' + id);
  }

  deleteVehicle(id: number) {
    return this.data.delete<Vehicle>(this.baseUrl + '/vehicles/' + id);
  }

  addVehicle(car: Vehicle, id: number, user: number) {
    return this.data.post<Vehicle>(this.baseUrl + '/vehicles/' + id + '/' + user, JSON.stringify(car), {headers: this.headers});
  }
  updateVehicles(car: Vehicle, id: number) {
    return this.data.put<Vehicle>(this.baseUrl + '/vehicles', JSON.stringify(car), {headers: this.headers});
  }
}
