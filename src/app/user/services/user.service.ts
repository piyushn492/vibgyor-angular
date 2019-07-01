import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user): Observable<User> {
    user = {
      'name': user['fullName'],
      'roles': ['User'],
      'username': user['email'],
      'password': user['password'],
      'social': false
    } as User;
    return this.http.post<User>(`${environment.apiEndPoint}/api/users/`, user);
  }

  addAdmin(user): Observable<User> {
    return this.http.post<User>(`${environment.apiEndPoint}/api/users/`, user);
  }


  addUserSocialLogin(user): Observable<User> {
    // console.log(user);
    user = {
      'name': user['name'],
      'roles': ['User'],
      'username': user['email'],
      'password': user['id'],
      'social': true
    } as User;
    // console.log('final' + user);
    return this.http.post<User>(`${environment.apiEndPoint}/api/users/`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiEndPoint}/api/users/`);
  }

  loginUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiEndPoint}/oauth/token/`, user);
  }

  checkIfEmailExist(username: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${environment.apiEndPoint}/api/exist/users/username/${username}`);
  }

  getUsersByID(userID: string): Observable<User> {
    return this.http.get<User>(`${environment.apiEndPoint}/api/users/${userID}`);
  }

  getUsersByUserName(userName: string): Observable<User> {
    return this.http.get<User>(`${environment.apiEndPoint}/api/users/?username=${userName}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiEndPoint}/api/users/${user['id']}`, user);
  }

  deleteUser(userID: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiEndPoint}/api/users/${userID}`);
  }

}
