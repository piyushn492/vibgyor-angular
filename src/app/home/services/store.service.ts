import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../model/city';
import { environment } from './../../../environments/environment';
import { Store } from '../model/store';

// console.log('ENV ', environment);

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiEndPoint}/api/cities`);
  }

  searchCitiess(q: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiEndPoint}/api/cities?q=${q}`);
  }

  getStores(cityName: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${environment.apiEndPoint}/api/stores?cityName=${cityName}`);
  }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${environment.apiEndPoint}/api/stores`);
  }

  updateStore(store: Store) {
    return this.http.put<Store[]>(`${environment.apiEndPoint}/api/stores/${store.id}`, store);
  }

  deleteStore(storeID: string) {
    return this.http.delete<Store>(`${environment.apiEndPoint}/api/stores/${storeID}`);
  }

  addNewStore(store: Store) {
    return this.http.post<Store>(`${environment.apiEndPoint}/api/stores/`, store);
  }

}
