import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { CartOrders } from '../../model/cartorders';
import { AuthService } from '../../../user/services/auth.service';
import { User } from '../../../user/model/user';
import { Cart } from '../../model/cart';
import { ArraySortPipe } from '../../../shared/pipes/arraySort.pipes';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
  providers: [ArraySortPipe]
})
export class MyordersComponent implements OnInit {

  constructor(private cartService: CartService, private authService: AuthService, private sort: ArraySortPipe) { }
  cartOrders: CartOrders[];
  isLoggedIn: Boolean;
  user: User;
  currentCartOrder: CartOrders;
  span = document.getElementsByClassName('close')[0];
  totalAmount = 0;
  carts: Cart[];

  ngOnInit() {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => {
          this.user = user;
          this.cartService.getAllPlacedProducts(this.user.username).subscribe((carts) => {
            this.cartOrders = carts;
            this.sort.transform(this.cartOrders, 'id');
          });
        });
      }
    });
  }

  hideModal() {
    document.getElementById('myModal').style.display = 'none';
  }

  showDetails(cartOrder) {
    this.totalAmount = 0;
    this.currentCartOrder = cartOrder;
    this.carts = this.currentCartOrder.carts;
    this.currentCartOrder.carts.forEach((cart) => {
      this.totalAmount = this.totalAmount + cart.price;
    });
    document.getElementById('myModal').style.display = 'block';
  }

}
