import { Component, OnInit } from '@angular/core';
import { Paint } from 'src/app/catalog/model/paint';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/services/product.service';
import { PriceEstimatorComponent } from 'src/app/products/components/price-estimator/price-estimator.component';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../../cart/model/cart';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { AuthService } from '../../../user/services/auth.service';
import { User } from '../../../user/model/user';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(1200, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class ProductViewComponent implements OnInit {

  paintId: number;
  paint: Paint;
  show: Boolean = false;
  cartLength: number;
  carts: Cart[];
  isLoggedIn: Boolean;
  user: User;
  childData = 0;

  constructor(private route: ActivatedRoute, private router: Router,
     private productService: ProductService, private cartService: CartService, private authService: AuthService) {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => this.user = user);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paintId = +params['id'];
      this.productService.getProductsById(this.paintId).subscribe((paint) => {
        this.paint = paint[0];
      });
    });
    this.cartService.cartLength.subscribe(cartLength => this.cartLength = cartLength);
  }

  priceEstimate(paintItem): void {
    this.router.navigate(['/product/price/' + paintItem.id]);
  }

  addToCart(cartToAdd: Paint) {
    // for offline users..
    if (this.isLoggedIn === false) {
      // offline users..
      this.cartService.addToCart(cartToAdd);
      this.carts = this.cartService.getCarts();
      this.cartService.getCartsLength(this.carts.length);
    } else {
      // online users..
      this.cartService.addToCartUser(cartToAdd, this.user).subscribe((carts) => {
        // tslint:disable-next-line:no-shadowed-variable
        this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
          this.carts = carts;
          this.cartService.getCartsLength(this.carts.length);
        });
      });
    }
  }
}
