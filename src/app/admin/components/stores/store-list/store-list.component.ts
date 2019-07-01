import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../home/services/store.service';
import { Router } from '@angular/router';
import { Store } from '../../../../home/model/store';
import { City } from '../../../../home/model/city';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreEditComponent } from '../store-edit/store-edit.component';
import { StoreAddComponent } from '../store-add/store-add.component';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  constructor(private storeService: StoreService, private utilityService: UtilityService, public dialog: MatDialog) { }
  stores: Store[];
  store: Store;
  cities: City[];
  city: City;

  ngOnInit() {
    this.storeService.getAllStores().subscribe((stores) => {
      this.stores = stores;
    });

    this.utilityService.getAllCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  editStore(store) {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(StoreEditComponent, {
      width: '250px',
      data: { store }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.storeService.getAllStores().subscribe((stores) => {
        this.stores = stores;
      });
    });
  }

  addStore() {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(StoreAddComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.storeService.getAllStores().subscribe((stores) => {
        this.stores = stores;
      });
    });
  }

  deleteStore(store) {
    this.storeService.deleteStore(store.id).subscribe();
    this.storeService.getAllStores().subscribe((stores) => {
      this.stores = stores;
    });
  }

}
