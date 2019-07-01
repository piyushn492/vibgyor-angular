import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../../user/model/user';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import { ProductService } from '../../products/services/product.service';
import { Paint } from '../../products/model/paint';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean;
  user: User;
  admin: Boolean = false;
  form: FormGroup;
  productSearch: FormControl;
  paints: Paint[];
  sarchText: string;

  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private productService: ProductService) {
    this.productSearch = new FormControl('');
    this.form = this.formBuilder.group({
      'productSearch': this.productSearch
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.paints = products;
    });
    this.productSearch.valueChanges.filter(value => !!value)
      .map(value => value.trim())
      .debounceTime(500).subscribe((value) => {
        this.sarchText = value;
        this.productService.searchPaints(this.sarchText).subscribe((paints) => {
          this.paints = paints;
        });
      });

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
    }
    );
  }

  logout() {
    this.authService.logout();
    this.admin = false;
    this.snackBar.open('Successfully Logged Out !', '', {
      duration: 2000,
    });
    this.router.navigate(['home']);
  }

  openSearch() {
    document.getElementById('myOverlay').style.display = 'block';
  }

  closeSearch() {
    document.getElementById('myOverlay').style.display = 'none';
  }

  getProduct(paint: Paint) {
    // console.log(paint.id);
    document.getElementById('myOverlay').style.display = 'none';
    this.form.reset();
    this.router.navigate(['/product/view/' + paint.id]);
  }
}
