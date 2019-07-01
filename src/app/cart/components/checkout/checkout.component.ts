import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/model/user';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../model/cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../shared/services/utility.service';
import { State } from '../../../home/model/state';
import { City } from '../../../home/model/city';
import { AuthService } from '../../../user/services/auth.service';
import { ProfileService } from '../../../user/services/profile.service';
import { Profile } from '../../../user/model/Profile';
import { CartOrders } from '../../model/cartorders';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService, private _formBuilder: FormBuilder,
    private utilityService: UtilityService, private authService: AuthService,
     private profileService: ProfileService, private router: Router) { }
  user: User;
  carts: Cart[] = [];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  states: State[];
  cities: City[];
  isLoggedIn: Boolean;
  profile: Profile;
  cartOrder: CartOrders;

  ngOnInit() {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => {
          this.user = user;
          this.cartService.getCartsByUserID(user['id']).subscribe((carts) => {
            this.carts = carts;
            // this.profileService.getProfile(this.user['id']).subscribe((profile) => {
            //   this.profile = profile;
            //   // if (profile[0] !== undefined) {
            //   //   this.firstFormGroup.get('address').setValue(this.profile[0].address);
            //   //   this.firstFormGroup.get('state').setValue(this.profile[0].state);
            //   //   this.firstFormGroup.get('city').setValue(this.profile[0].city);
            //   //   this.firstFormGroup.get('zipCode').setValue(this.profile[0].zipCode);
            //   // }
            // });
          });
        });
      }
    });
    // this.utilityService.getStates().subscribe((states) => this.states = states);

    this.secondFormGroup = this._formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{15}(?:[0-9]{1})?$/)]]
    });

  }

  placeOrder(cardDetails) {
    this.profileService.getProfile(this.user['id']).subscribe((profile) => {
      // this.profile = profile;
      // console.log(this.profile)
      // this.profile = {
      //   'id': this.profile[0].id,
      //   'userID': this.user['id'],
      //   'address': userDetails['address'],
      //   'fullName': this.user.name,
      //   'state': userDetails['state'],
      //   'city': userDetails['city'],
      //   'zipCode': userDetails['zipCode']
      // } as Profile;
      // tslint:disable-next-line:no-shadowed-variable
      // this.profileService.updateProfile(this.profile).subscribe((profile) => {
        this.cartService.placeOrder(this.carts).subscribe((cartOrder) => {
          this.cartOrder = cartOrder;
          this.carts.forEach((cart) => {
            this.cartService.deleteOrdersInCart(cart.id).subscribe();
          });
          this.router.navigate(['cart/orders']);
        });
      // });
    },
    );


    // this.carts = this.cartService.getCarts();
    // this.cartService.placeOrder(this.carts).subscribe();
    // this.carts = this.cartService.getCarts();
    // this.cartService.getCartsLength(0);
  }

  getStates($event) {
    this.utilityService.getStateByName($event.source.value).subscribe((state) => {
      this.utilityService.getCities(state[0].id).subscribe((cities) => {
        this.cities = cities;
      });
    });
  }

}
