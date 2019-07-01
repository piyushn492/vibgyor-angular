import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { State } from '../../home/model/state';
import { City } from '../../home/model/city';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${environment.apiEndPoint}/api/states/`);
  }

  getCityByID(cityID: string): Observable<City> {
    return this.http.get<City>(`${environment.apiEndPoint}/api/cities/?id=${cityID}`);
  }

  getStateByName(stateName: string): Observable<State> {
    return this.http.get<State>(`${environment.apiEndPoint}/api/states/?name=${stateName}`);
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiEndPoint}/api/cities/`);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(`${environment.apiEndPoint}/api/cities/`, city);
  }

  getCities(stateId: number): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiEndPoint}/api/cities/?stateId=${stateId}`);
  }

  updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${environment.apiEndPoint}/api/cities/${city.id}`, city);
  }

  deleteCity(cityID: number): Observable<City> {
    return this.http.delete<City>(`${environment.apiEndPoint}/api/cities/${cityID}`);
  }
}
