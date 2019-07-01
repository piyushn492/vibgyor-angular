import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Profile } from '../model/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(userId: string): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiEndPoint}/api/profiles/?userID=${userId}`);
  }

  addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${environment.apiEndPoint}/api/profiles/`, profile);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${environment.apiEndPoint}/api/profiles/${profile.id}`, profile);
  }
}
