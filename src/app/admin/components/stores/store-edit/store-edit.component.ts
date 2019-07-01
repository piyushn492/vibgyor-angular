import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { Store } from '../../../../home/model/store';
import { City } from '../../../../home/model/city';
import { StoreService } from '../../../../home/services/store.service';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StoreEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    private utilityService: UtilityService, private router: Router, private storeService: StoreService) { }

  firstFormGroup: FormGroup;
  city: City;
  stores: Store[];
  cities: City[];
  store: Store;

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      storeName: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.firstFormGroup.get('storeName').setValue(this.data.store.storeName);
    this.firstFormGroup.get('contactPersonName').setValue(this.data.store.storeContactPersonName);
    this.firstFormGroup.get('mobile').setValue(this.data.store.mobile);
    this.firstFormGroup.get('city').setValue(this.data.store.cityName);
    this.firstFormGroup.get('address').setValue(this.data.store.storeAddress);


    this.utilityService.getAllCities().subscribe((cities) => {
      this.cities = cities;
      this.storeService.getAllStores().subscribe((stores) => {
        this.stores = stores;
      });
    });

  }

  Update(value) {
    // console.log(value);
    this.store = {
      'id': this.data.store.id,
      'cityName':  value.city,
      'storeName':  value.storeName,
      'storeContactPersonName': value.contactPersonName,
      'storeAddress': value.address,
      'mobile': value.mobile
    } as Store;


    this.storeService.updateStore(this.store).subscribe((stores) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.storeService.getAllStores().subscribe((stores) => {
        this.stores = stores;
      });
    });

  }

}
