import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../shared/services/utility.service';
import { City } from '../../../../home/model/city';
import { State } from '../../../../home/model/state';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CityEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    private utilityService: UtilityService, private router: Router) { }

  states: State[];
  firstFormGroup: FormGroup;
  city: City;
  state: State;

  ngOnInit() {
    this.utilityService.getCityByID(this.data.element['id']).subscribe((city) => {
      this.city = city[0];
      this.firstFormGroup.get('cityName').setValue(this.city.name);
      this.firstFormGroup.get('state').setValue(this.city.state);
    });
    this.utilityService.getStates().subscribe((states) => {
      this.states = states;
    });
    this.firstFormGroup = this._formBuilder.group({
      cityName: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  Update(value) {
    // console.log(value);
    this.utilityService.getStateByName(value.state).subscribe((state) => {
      this.state = state[0];
      this.city = {
        'id': this.city.id,
        'name': value.cityName,
        'state': value.state,
        'stateId': this.state.id
      } as City;
      this.utilityService.updateCity(this.city).subscribe((city) => {
        this.city = city;
        this.router.navigate(['admin/city-list']);
      });
    });
  }

}
