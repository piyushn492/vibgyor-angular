import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/services/auth.service';
import { CartService } from './shared/services/cart.service';
import { User } from './user/model/user';
import { Cart } from './cart/model/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: Boolean;
  user: User;
  carts: Cart[];
  title = 'Vibgyor paints';

  constructor(private authService: AuthService, private cartService: CartService) {
  }

  ngOnInit() {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => {
          this.user = user;
          this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
            this.carts = carts;
            // console.log(this.carts)
            this.cartService.getCartsLength(this.carts.length);
          });
        });
      }
    });
  }

}
