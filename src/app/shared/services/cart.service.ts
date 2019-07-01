import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Cart } from '../../cart/model/cart';
import { Paint } from '../../catalog/model/paint';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CartOrders } from '../../cart/model/cartorders';
import { User } from '../../user/model/user';
import { AuthService } from '../../user/services/auth.service';

@Injectable()
export class CartService {

  paints: Paint[];
  carts = [];
  cart: Cart;
  productFound: Boolean = false;
  cartOrdres: CartOrders;
  user: User;
  isLoggedIn: Boolean;

  // for cart badge update..
  cartLength = new BehaviorSubject<number>(0);
  cast = 0;

  getCartsLength(value) {
    this.cast = value;
    this.cartLength.next(this.cast);
  }


  constructor(private http: HttpClient) {
  }

  // with out login..
  addToCart(cartToAdd: Paint) {
    this.carts = JSON.parse(localStorage.getItem('carts'));
    if (this.carts != null) {
      this.carts = [];
      this.carts = JSON.parse(localStorage.getItem('carts'));
      this.productFound = false;
      // tslint:disable-next-line:prefer-const
      for (let cart of this.carts) {
        if (cart.productId === cartToAdd.id) {
          this.productFound = true;
          cart.productQuantity = cart.productQuantity + 1;
        }
      }

      if (this.productFound === false) {
        this.cart = {
          'id': null,
          'userID': null,
          'productId': cartToAdd.id,
          'productQuantity': 1,
          'addedTime': new Date(),
          'price': cartToAdd.price,
          'name': cartToAdd.name,
          'imageUrl': cartToAdd.imageUrl,
          'productPrice': cartToAdd.price,
        } as Cart;
        this.carts.push(this.cart);
      }
      localStorage.setItem('carts', JSON.stringify(this.carts));
    } else {
      this.carts = [];
      this.cart = {
        'id': null,
        'userID': null,
        'productId': cartToAdd.id,
        'productQuantity': 1,
        'addedTime': new Date(),
        'price': cartToAdd.price,
        'name': cartToAdd.name,
        'imageUrl': cartToAdd.imageUrl,
        'productPrice': cartToAdd.price,
      } as Cart;
      this.carts.push(this.cart);
      localStorage.setItem('carts', JSON.stringify(this.carts));
    }
  }

  addToCartUser(cartToAdd: Paint, user: User): Observable<Cart> {
    // console.log(user);
    this.productFound = false;
    this.getCartsByUserID(user['id']).subscribe((carts) => {
      this.carts = carts;
      if (this.carts.length !== undefined) {
        // tslint:disable-next-line:prefer-const
        for (let cart of this.carts) {
          if (cart.productId === cartToAdd.id) {
            this.productFound = true;
          }
        }

        if (this.productFound === true) {
          return this.http.get<Cart>(`${environment.apiEndPoint}/api/carts/?userID=${user['id']}`).subscribe((paint) => {
            this.getCartsByUserID(user['id']).subscribe((userCarts) => {
               this.carts = userCarts;
              this.getCartsLength(this.carts.length);
            });
          });
        }
        if (this.productFound === false) {
          this.cart = {
            'userID': user['id'],
            'productId': cartToAdd.id,
            'productQuantity': 1,
            'addedTime': new Date(),
            'price': cartToAdd.price,
            'name': cartToAdd.name,
            'imageUrl': cartToAdd.imageUrl,
            'productPrice': cartToAdd.price,
          } as Cart;
          return this.http.post<Cart>(`${environment.apiEndPoint}/api/carts/`, this.cart).subscribe((paint) => {
            this.getCartsByUserID(user['id']).subscribe((userCarts) => {
              this.carts = userCarts;
              this.getCartsLength(this.carts.length);
            });
          });
        }
      } else {
        this.cart = {
          'userID': user['id'],
          'productId': cartToAdd.id,
          'productQuantity': 1,
          'addedTime': new Date(),
          'price': cartToAdd.price,
          'name': cartToAdd.name,
          'imageUrl': cartToAdd.imageUrl,
          'productPrice': cartToAdd.price,
        } as Cart;
        return this.http.post<Cart>(`${environment.securedApiEndPoint}/api/carts/`, this.cart);
      }
    });
    return this.http.get<Cart>(`${environment.securedApiEndPoint}/api/carts/?userID=${user['id']}`);
  }

  addToCartUserCart(cartToAdd: Cart, user: User): Observable<Cart> {
    this.getCartsByUserID(user['id']).subscribe((carts) => {
      this.carts = carts;
    });
    // console.log('came here');
    if (this.carts != null) {
      // tslint:disable-next-line:prefer-const
      for (let cart of this.carts) {
        if (cart.productId === cartToAdd.id) {
          this.productFound = true;
        }
      }

      if (this.productFound === true) {
        return this.http.get<Cart>(`${environment.securedApiEndPoint}/api/carts/?userID=${user['id']}`);
      }
      if (this.productFound === false) {
        this.cart = {
          'userID': user['id'],
          'productId': cartToAdd.productId,
          'productQuantity': 1,
          'addedTime': new Date(),
          'price': cartToAdd.price,
          'name': cartToAdd.name,
          'imageUrl': cartToAdd.imageUrl,
          'productPrice': cartToAdd.price,
        } as Cart;
        return this.http.post<Cart>(`${environment.securedApiEndPoint}/api/carts/`, this.cart);
      }
    } else {
      this.cart = {
        'userID': user['id'],
        'productId': cartToAdd.productId,
        'productQuantity': 1,
        'addedTime': new Date(),
        'price': cartToAdd.price,
        'name': cartToAdd.name,
        'imageUrl': cartToAdd.imageUrl,
        'productPrice': cartToAdd.price,
      } as Cart;
      return this.http.post<Cart>(`${environment.securedApiEndPoint}/api/carts/`, this.cart);
    }
  }


  getCarts(): Array<Cart> {
    return JSON.parse(localStorage.getItem('carts'));
  }

  deleteOrder(cartToDelete: Cart) {
    this.carts = JSON.parse(localStorage.getItem('carts'));
    // tslint:disable-next-line:prefer-const
    for (let cart of this.carts) {

      if (cart.id === cartToDelete.id) {
        this.carts.splice(this.carts.indexOf(cart), 1);
      }
    }
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  deleteOrderAfterLogin(cartToDelete: Cart): Observable<Cart> {
    return this.http.delete<Cart>(`${environment.securedApiEndPoint}/api/carts/${cartToDelete.id}`);
  }

  placeOrder(carts: Cart[]): Observable<CartOrders> {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.cartOrdres = {
      'username': this.user.username,
      'carts': carts,
      'orderDate': new Date(),
      'deliveryStatus': 'placed'
    } as CartOrders;
    localStorage.setItem('carts', null);
    this.getCartsLength(0);
    return this.http.post<CartOrders>(`${environment.securedApiEndPoint}/api/cartOrders/`, this.cartOrdres);
  }

  deleteOrdersInCart(cartID: number): Observable<CartOrders> {
    return this.http.delete<CartOrders>(`${environment.securedApiEndPoint }/api/carts/${cartID}`);
  }

  getCartsByUserID(userID: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${environment.apiEndPoint}/api/carts/?userID=${userID}`);
  }

  getAllPlacedProducts(username: string): Observable<CartOrders[]> {
    return this.http.get<CartOrders[]>(`${environment.apiEndPoint}/api/cartOrders/?username=${username}`);
  }

  getAllPlacedProductsAdmin(): Observable<CartOrders[]> {
    return this.http.get<CartOrders[]>(`${environment.apiEndPoint}/api/cartOrders/`);
  }

}
