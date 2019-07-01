import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from '../model/catalog';
import { environment } from './../../../environments/environment';
import { Paint } from '../model/paint';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${environment.apiEndPoint}/api/catalogs`);
  }

  addCatalogs(catalog: Catalog): Observable<Catalog> {
    return this.http.post<Catalog>(`${environment.apiEndPoint}/api/catalogs`, catalog);
  }

  getCatalogeById(catalogId: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${environment.apiEndPoint}/api/catalogs/?id=${catalogId}`);
  }


  getCatalogeByName(catalogName: string): Observable<Catalog> {
    return this.http.get<Catalog>(`${environment.apiEndPoint}/api/catalogs/?catalogName=${catalogName}`);
  }

  searchCatalogs(catalogId: number): Observable<Paint[]> {
    return this.http.get<Paint[]>(`${environment.apiEndPoint}/api/paints/?categoryId=${catalogId}`);
  }

  updateCatalog(catalog: Catalog): Observable<Catalog> {
    return this.http.put<Catalog>(`${environment.apiEndPoint}/api/catalogs/${catalog.id}`, catalog);
  }

  deleteCatalog(catalogID: number): Observable<Catalog> {
    return this.http.delete<Catalog>(`${environment.apiEndPoint}/api/catalogs/${catalogID}`);
  }

}
