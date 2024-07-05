import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  private baseURL: string = 'https://localhost:7240/api/car/';

  getListCars():Observable<any>{
    return this.http.get(this.baseURL)
  }
}
