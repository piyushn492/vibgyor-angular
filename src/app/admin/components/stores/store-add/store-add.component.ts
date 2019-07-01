import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { StoreService } from '../../../../home/services/store.service';
import { City } from '../../../../home/model/city';
import { Store } from '../../../../home/model/store';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css']
})
export class StoreAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StoreAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    private utilityService: UtilityService, private router: Router, private storeService: StoreService) { }

  firstFormGroup: FormGroup;
  city: City;
  stores: Store[];
  cities: City[];
  store: Store;

  ngOnInit() {
    this.utilityService.getAllCities().subscribe((cities) => {
      this.cities = cities;
    });
    this.firstFormGroup = this._formBuilder.group({
      storeName: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  Update(value) {
    this.store = {
      'cityName':  value.city,
      'storeName':  value.storeName,
      'storeContactPersonName': value.contactPersonName,
      'storeAddress': value.address,
      'mobile': value.mobile
    } as Store;

    this.storeService.addNewStore(this.store).subscribe();
  }

}
