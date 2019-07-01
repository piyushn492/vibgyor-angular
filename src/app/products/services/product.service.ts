import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Paint } from '../model/paint';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsById(productId: number): Observable<Paint> {
    return this.http.get<Paint>(`${environment.apiEndPoint}/api/paints/?id=${productId}`);
  }

  getProducts(): Observable<Paint[]> {
    return this.http.get<Paint[]>(`${environment.apiEndPoint}/api/paints/`);
  }

  getProductsLazy(_start, _end): Observable<Paint[]> {
    return this.http.get<Paint[]>(`${environment.apiEndPoint}/api/paints?_start=${_start}&_end=${_end}`);
  }

  getProductsFilter(filterValue): Observable<Paint[]> {
    return this.http.get<Paint[]>(`${environment.apiEndPoint}/api/paints/?categoryId=${filterValue}`);
  }

  getProductsFilterLazy(filterValue, _start, _end): Observable<Paint[]> {
    return this.http.get<Paint[]>(`${environment.apiEndPoint}/api/paints/?categoryId=${filterValue}&_start=${_start}&_end=${_end}`);
  }

  getPriceFilter(value): Observable<Paint[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Paint[]>(`${environment.apiEndPoint}/api/paints/?price_gte=${0}&price_lte=${value}&_sort=price&_order=asc`);
  }

  updatePaint(paint: Paint): Observable<Paint> {
    return this.http.put<Paint>(`${environment.apiEndPoint}/api/paints/${paint.id}`, paint);
  }

  deleteProduct(paintID: string): Observable<Paint> {
    return this.http.delete<Paint>(`${environment.apiEndPoint}/api/paints/${paintID}`);
  }

  addPaint(paint: Paint): Observable<Paint> {
    return this.http.post<Paint>(`${environment.apiEndPoint}/api/paints/`, paint);
  }

  searchPaints(q: string): Observable<Paint[]> {
    return this.http.get<Paint[]>(`${environment.apiEndPoint}/api/paints?q=${q}`);
  }
}
