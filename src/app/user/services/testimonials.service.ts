import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Testimonials } from '../model/testimonials';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(private http: HttpClient) { }

  getTestimonials(): Observable<Testimonials[]> {
    return this.http.get<Testimonials[]>(`${environment.apiEndPoint}/api/testimonials/`);
  }

  uploadImage(file: File): Observable<File> {
    // console.log(file.name);
    const fd = new FormData();
    fd.append('document', file, file.name);
    return this.http.post<File>(`${environment.apiEndPoint}/uploads`, fd);
  }
}
