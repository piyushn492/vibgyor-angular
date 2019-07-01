import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/catalog/services/catalog.service';
import { Catalog } from '../../model/catalog';
import { Paint } from '../../model/paint';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../../cart/model/cart';
import { AuthService } from '../../../user/services/auth.service';
import { User } from '../../../user/model/user';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.css']
})
export class CatalogViewComponent implements OnInit {

  catalogId: number;
  paints: Paint[];
  catalog: Catalog;
  cartLength: number;
  carts: Cart[];
  isLoggedIn: Boolean;
  user: User;

  constructor(private route: ActivatedRoute, private catalogeService: CatalogService,
    private router: Router, private cartService: CartService, private authService: AuthService) {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => this.user = user);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.catalogId = +params['id'];
      this.catalogeService.getCatalogeById(this.catalogId).subscribe((cataloge) => {
        this.catalog = cataloge[0];
      });
      this.catalogeService.searchCatalogs(this.catalogId).subscribe((paints) => {
        this.paints = paints;
      });
    });

    this.cartService.cartLength.subscribe(cartLength => this.cartLength = cartLength);
  }

  selectedCard(selectedPaint) {
    this.router.navigate(['/product/view/' + selectedPaint.id]);
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
