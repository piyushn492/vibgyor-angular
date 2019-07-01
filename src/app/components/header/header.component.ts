import { Component, OnInit } from '@angular/core';
import { Cart } from '../../cart/model/cart';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../user/services/auth.service';
import { User } from '../../user/model/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  length: number;
  cartLength: number;
  admin: Boolean = false;
  user: User;
  isLoggedIn: Boolean = false;
  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    this.cartService.cartLength.subscribe(cartLength => {
      this.cartLength = cartLength;
      this.authService.authStatus.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.authService.user$.subscribe((user) => {
          this.user = user;
          if (this.user.name === undefined) {
            this.admin = false;
          } else if (this.user.roles.includes('admin')) {
            this.admin = true;
          }
        });
      });
    });
  }


}
