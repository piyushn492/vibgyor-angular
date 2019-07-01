import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UtilityService } from '../../services/utility.service';
import { City } from '../../../home/model/city';
import { ProfileService } from '../../../user/services/profile.service';
import { Profile } from '../../../user/model/Profile';
import { AuthService } from '../../../user/services/auth.service';
import { User } from '../../../user/model/user';
import { State } from '../../../home/model/state';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private utilityService: UtilityService,
    private profileService: ProfileService, private authService: AuthService, public snackBar: MatSnackBar) { }
  firstFormGroup: FormGroup;
  cities: City[];
  profile: Profile;
  isLoggedIn: Boolean;
  user: User;
  states: State[];

  ngOnInit() {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => {
          this.user = user;
          this.profileService.getProfile(this.user['id']).subscribe((profile) => {
            this.profile = profile;
            // console.log(this.profile[0]);
            this.utilityService.getAllCities().subscribe((cities) => {
              this.cities = cities;
            });
            if (profile[0] !== undefined) {
              this.firstFormGroup.get('address').setValue(this.profile[0].address);
              this.firstFormGroup.get('city').setValue(this.profile[0].city);
              this.firstFormGroup.get('state').setValue(this.profile[0].state);
              this.firstFormGroup.get('zipCode').setValue(this.profile[0].zipCode);
            }
          });
        });
      }
    });
    this.utilityService.getStates().subscribe((states) => this.states = states);
    // this.profileService.getProfile
    this.firstFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^((?!(0))[0-9]{6})$/)]]
    });
  }

  getStates($event) {
    this.utilityService.getStateByName($event.source.value).subscribe((state) => {
      this.utilityService.getCities(state[0].id).subscribe((cities) => {
        this.cities = cities;
      });
    });
  }

  update(value) {
    this.profileService.getProfile(this.user['id']).subscribe((profile) => {
      this.profile = profile;
      // console.log(value.address);
      if (this.profile[0] !== undefined) {
        this.profile = {
          'id': this.profile[0].id,
          'userID': this.user['id'],
          'address': value.address,
          'fullName': value.fullName,
          'state': value.state,
          'city': value.city,
          'zipCode': value.zipCode
        } as Profile;
        this.profileService.updateProfile(this.profile).subscribe((profile1) => {
          this.profile = profile1;
          this.snackBar.open('Updated successfully !', '', {
            duration: 2000,
          });
        });
      } else {
        this.profile = {
          'userID': this.user['id'],
          'address': value.address,
          'fullName': value.fullName,
          'state': value.state,
          'city': value.city,
          'zipCode': value.zipCode
        } as Profile;
        this.profileService.addProfile(this.profile).subscribe((profile1) => {
          this.profile = profile1;
          this.snackBar.open('Updated successfully !', '', {
            duration: 2000,
          });
        });
      }
    });
  }
}
