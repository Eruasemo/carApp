import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  private baseURL: string = 'https://localhost:7240/api/car/';

  getListCars(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`);
  }

  create(car: any): Observable<any> {
    return this.http.post(this.baseURL, car);
  }

  update(car: any): Observable<any> {
    return this.http.put(`${this.baseURL}${car.id}`, car);
  }
}
