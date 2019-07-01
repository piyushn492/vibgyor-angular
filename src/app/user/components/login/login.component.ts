import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../shared/services/cart.service';
import {
  AuthService as socialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../model/Profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  isLoggedIn: Boolean;
  carts: Cart[] = [];
  oldCarts: Cart[] = [];
  profile: Profile;

  constructor(private router: Router, private userService: UserService,
    private authService: AuthService, public snackBar: MatSnackBar,
    private cartService: CartService, private auth: socialAuthService, private profileService: ProfileService) {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => this.user = user);
      }
    });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.auth.signIn(socialPlatformProvider).then(
      (userData) => {
        this.user = {
          'username': userData['email'],
          'password': userData['id']
        } as User;

        // console.log(socialPlatform + ' sign in data :', this.user);
        this.userService.checkIfEmailExist(userData['email']).subscribe((result) => {
          if (result['result']) {
            this.loginSocial(this.user);
          } else {
            this.userService.addUserSocialLogin(userData).subscribe((user) => {
              this.profile = {
                'userID': user['id'],
                'fullName': user['name']
              } as Profile;
              this.profileService.addProfile(this.profile).subscribe((profile) => {
                this.profile = profile;
                this.loginSocial(this.user);
              }
              );
            }
            );
          }
        });
      }
    );
  }

  ngOnInit() {

  }

  signUp() {
    this.router.navigate(['user/signup']);
  }

  login(value) {
    this.user = {
      'username': value.email,
      'password': value.password
    } as User;

    this.authService.login(this.user).subscribe((response) => {
      this.snackBar.open('Successfully Logged in !', '', {
        duration: 2000,
      });
      this.oldCarts = JSON.parse(localStorage.getItem('carts'));
      if (this.oldCarts != null) {
        this.oldCarts.forEach((cart) => {
          this.cartService.addToCartUserCart(cart, this.user).subscribe((carts) => {
            // tslint:disable-next-line:no-shadowed-variable
            this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
              this.carts = carts;
              this.cartService.getCartsLength(this.carts.length);
              this.router.navigate([this.authService.redirectUrl || 'home']);
            });
          });
        });
      } else {
        this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
          this.carts = carts;
          this.cartService.getCartsLength(this.carts.length);
          if (this.user.roles.includes('admin')) {
            this.router.navigate(['admin/home']);
          } else {
            this.router.navigate([this.authService.redirectUrl || 'home']);
          }
        });
      }

    }, (errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 403) {
        this.snackBar.open('Invalid username or password !', '', {
          duration: 2000,
        });
      }
    }
    );
  }

  loginSocial(user) {
    this.authService.login(this.user).subscribe((response) => {
      this.snackBar.open('Successfully Logged in !', '', {
        duration: 2000,
      });
      this.oldCarts = JSON.parse(localStorage.getItem('carts'));
      if (this.oldCarts != null) {
        this.oldCarts.forEach((cart) => {
          this.cartService.addToCartUserCart(cart, this.user).subscribe((carts) => {
            // tslint:disable-next-line:no-shadowed-variable
            this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
              this.carts = carts;
              this.cartService.getCartsLength(this.carts.length);
              this.router.navigate([this.authService.redirectUrl || 'home']);
            });
          });
        });
      } else {
        this.cartService.getCartsByUserID(this.user['id']).subscribe((carts) => {
          this.carts = carts;
          this.cartService.getCartsLength(this.carts.length);
          this.router.navigate([this.authService.redirectUrl || '/']);
        });
      }

    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse.status, 'error');
    }
    );
  }


}
