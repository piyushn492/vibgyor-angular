import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookConsultant } from '../model/book-consultant';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookConsultantService {

  constructor(private http: HttpClient) { }

  addRequest(bookRequest: BookConsultant): Observable<BookConsultant[]> {
    return this.http.post<BookConsultant[]>(`${environment.apiEndPoint}/api/conultantRequests`, bookRequest);
  }

  getRequets(): Observable<BookConsultant[]> {
    return this.http.get<BookConsultant[]>(`${environment.apiEndPoint}/api/conultantRequests`);
  }

  deleteRequest(requestID: string): Observable<BookConsultant> {
    return this.http.delete<BookConsultant>(`${environment.apiEndPoint}/api/conultantRequests/${requestID}`);
  }
}
