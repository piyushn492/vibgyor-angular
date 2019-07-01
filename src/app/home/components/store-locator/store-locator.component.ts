import { debounceTime } from 'rxjs/operator/debounceTime';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { StoreService } from 'src/app/home/services/store.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/home/model/city';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map, filter } from 'rxjs/operators';
import { Store } from 'src/app/home/model/store';


@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.component.html',
  styleUrls: ['./store-locator.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(400, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class StoreLocatorComponent implements OnInit {

  form: FormGroup;
  searchControl: FormControl;
  searchText: any = '';
  search: Boolean = true;
  stores: Store[];
  cityStatus: Boolean = false;
  storeAvailability: Boolean = false;

  constructor(private storeService: StoreService, private formBuilder: FormBuilder) {
    this.searchControl = new FormControl('');

    this.form = formBuilder.group({
      'searchControl': this.searchControl
    });
  }

  stateGroupOptions: Observable<City[]>;

  cities: City[];

  ngOnInit() {
    this.storeService.getCities().subscribe(
      (cities) => {
        this.cities = cities;
      });

    this.searchControl.valueChanges.map(value => value.trim())
      .subscribe((value: string) => {
        this.searchText = value;
        this.storeService.searchCitiess(this.searchText)
          .subscribe((results: any[]) => {
            this.cities = results;
          });
      });

    this.searchControl.valueChanges.subscribe((value: string) => this.storeService.getStores(value).subscribe(
      (stores) => {
        this.stores = stores;
        if (this.stores.length === 0) {
          this.storeAvailability = false;
        } else {
          this.storeAvailability = true;
        }
      }));
  }

  getStores(cityName) {
    this.storeService.getStores(cityName).subscribe(
      (stores) => {
        this.stores = stores;
      });
  }

}
