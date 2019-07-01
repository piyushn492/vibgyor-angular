import { Component, OnInit } from '@angular/core';
import { Paint } from 'src/app/catalog/model/paint';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/services/product.service';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../../cart/model/cart';
import { CatalogService } from '../../../catalog/services/catalog.service';
import { Catalog } from '../../../catalog/model/catalog';
import { AuthService } from '../../../user/services/auth.service';
import { User } from '../../../user/model/user';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { ProductFilter } from '../../../shared/pipes/productFilter.pipes';
import { ArraySortPipe } from '../../../shared/pipes/arraySort.pipes';
// import { InfiniteScrollModu } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductFilter, ArraySortPipe],
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
export class ProductListComponent implements OnInit {

  isLoggedIn: Boolean;
  user: User;
  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService, private cartService: CartService,
    private catalogService: CatalogService, private authService: AuthService,
    private productFilter: ProductFilter, private sort: ArraySortPipe) {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => this.user = user);
      }
    });
  }

  carts: Cart[] = [];
  paints: Paint[];
  cartLength: number;
  catalogs: Catalog[];
  checkedValues: Array<string> = [];
  selectedButton: string;
  _start = 0;
  _end = 5;

  ngOnInit() {
    this.catalogService.getCatalogs().subscribe((catalogs) => {
      this.catalogs = catalogs;
    });
    this.cartService.cartLength.subscribe(cartLength => this.cartLength = cartLength);
    this.productService.getProductsLazy(this._start, this._end).subscribe((paints) => this.paints = paints);
    this.carts = this.cartService.getCarts();
  }

  formatLabel(value: number | null) {
    return value;
  }

  selectedCard(selectedPaint) {
    this.router.navigate(['/product/view/' + selectedPaint.id]);
  }

  onScrollDown() {
    this._start = this._start + 5;
    this._end = this._end + 5;

    this.productService.getProductsLazy(this._start, this._end).subscribe((paints) => {
      paints.forEach((paint) => {
        this.paints.push(paint);
      });
    });

  }

  addToCart(cartToAdd: Paint) {
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

  buttonClicked(catalog) {
    if (catalog === 'All') {
      this.paints = [];
      this.productService.getProducts().subscribe((paints) => {
        this.paints = paints;
      });
    } else {
      this.productService.getProductsFilter(catalog['id']).subscribe((paints) => this.paints = paints);
    }
  }

  sortHighToLow() {
    this.sort.transform(this.paints, 'price');
  }

  sortLowToHigh() {
    this.sort.transform2(this.paints, 'price');
  }

  priceFilter($event) {
    this.productService.getPriceFilter($event.value).subscribe((paints) => this.paints = paints);
  }

  // filterPaints($event) {
  //   if ($event.source.checked === true) {
  //     this.checkedValues.push($event.source.value);
  //     this.productService.getProducts().subscribe((paints) => this.paints = paints);
  //     this.productFilter.transform(this.paints, this.checkedValues);
  //   } else {
  //     this.checkedValues.splice(this.checkedValues.indexOf($event.source.value), 1);
  //     this.productService.getProducts().subscribe((paints) => this.paints = paints);
  //     this.productFilter.transform(this.paints, this.checkedValues);
  //   }
  // }
}
