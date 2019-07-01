import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactUs } from '../model/contact-us';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  addContactUs(contactUs: ContactUs): Observable<ContactUs[]> {
    return this.http.post<ContactUs[]>(`${environment.apiEndPoint}/api/contactus`, contactUs);
  }

}
