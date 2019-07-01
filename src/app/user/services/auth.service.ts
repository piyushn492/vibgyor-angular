import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { CartService } from '../../shared/services/cart.service';
import { Cart } from '../../cart/model/cart';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string;
  authStatus: BehaviorSubject<boolean>;
  cartLength: number;
  carts: Cart[];

  user: User = new User();
  user$: BehaviorSubject<User>;

  constructor(private http: HttpClient, private cartService: CartService) {
    this.authStatus = new BehaviorSubject(this.isAuthenticated());
    this.user = this.getUser();
    this.user$ = new BehaviorSubject(this.user);
    this.cartService.cartLength.subscribe(cartLength => this.cartLength = cartLength);
  }

  getUser() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    } else { return new User(); }
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

  hasRole(role: string) {
    // includes from ES7
    return this.getUser().roles.includes(role);
  }

  login(value): Observable<any> {
    this.user = {
      'username': value.username,
      'password': value.password
    } as User;

    return this.http.post<User[]>(`${environment.apiEndPoint}/oauth/token/`, this.user)
      .map((data: any) => {

        this.user = data.identity;

        this.user$.next(this.user);
        localStorage.setItem('currentUser', JSON.stringify(this.user));

        localStorage.setItem('token', data.token);
        this.authStatus.next(true);
        return data;
      });
  }


  logout() {
    localStorage.clear();
    this.authStatus.next(false);
    this.user = new User();
    this.user$.next(this.user);
    this.carts = this.cartService.getCarts();
    this.cartService.getCartsLength(0);
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
