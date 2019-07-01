import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../model/cart';
import { ProductService } from '../../../products/services/product.service';
import { Paint } from '../../../catalog/model/paint';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { AuthService } from '../../../user/services/auth.service';
import { User } from '../../../user/model/user';
// import { AddressComponent } from '../../../shared/components/address/address.component';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  displayedColumns = ['name', 'quantity', 'price'];
  carts: Cart[] = [];
  paints: Paint[];
  totalPrice: number;
  isLoggedIn: Boolean;
  user: User;

  constructor(private cartService: CartService,
    private productService: ProductService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => {
          this.user = user;
          this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
            this.carts = carts;
            this.cartService.getCartsLength(this.carts.length);
            this.totalPrice = 0;
            // tslint:disable-next-line:prefer-const
            for (let cart of this.carts) {
              this.totalPrice = this.totalPrice + cart.productPrice;
            }
          });
        });
      }
    });

    if (this.isLoggedIn === false) {
      this.carts = this.cartService.getCarts();
      if (this.carts != null) {
        this.cartService.getCartsLength(this.carts.length);
        this.totalPrice = 0;
        // tslint:disable-next-line:prefer-const
        for (let cart of this.carts) {
          this.totalPrice = this.totalPrice + cart.price;
        }
      }
    }
    // else {
    //   //for logged in user..
    //   this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
    //     this.carts = carts
    //     if (this.carts != null) {
    //       this.cartService.getCartsLength(this.carts.length);
    //       for (let cart of this.carts) {
    //         this.totalPrice = this.totalPrice + cart.price;
    //       }
    //     }
    //   })
    // }
  }

  updatePrice(count, selectedCart: Cart) {
    selectedCart.price = selectedCart.productPrice * count;
    this.totalPrice = 0;
    // tslint:disable-next-line:prefer-const
    for (let cart of this.carts) {
      this.totalPrice = this.totalPrice + cart.price * cart.productQuantity;
    }
  }

  deleteOrder(selectedCart) {
    if (this.isLoggedIn === false) {
      this.totalPrice = 0;
      this.cartService.deleteOrder(selectedCart);
      this.carts = this.cartService.getCarts();
      this.cartService.getCartsLength(this.carts.length);
      // tslint:disable-next-line:prefer-const
      for (let cart of this.carts) {
        this.totalPrice = this.totalPrice + cart.price * cart.productQuantity;
      }
    } else {
      this.totalPrice = 0;
      this.cartService.deleteOrderAfterLogin(selectedCart).subscribe((carts) => {
        // tslint:disable-next-line:no-shadowed-variable
        this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
          this.carts = carts;
          if (this.carts.length !== undefined) {
            this.cartService.getCartsLength(this.carts.length);
            // tslint:disable-next-line:prefer-const
            for (let cart of this.carts) {
              this.totalPrice = this.totalPrice + cart.price;
            }
          } else {
            this.cartService.getCartsLength(0);
          }
        });
      });
    }
  }

  placeOrder() {
    this.carts = this.cartService.getCarts();
    this.router.navigate(['cart/checkout']);
  }

}
