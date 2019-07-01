import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../shared/services/utility.service';
import { City } from '../../../../home/model/city';
import { State } from '../../../../home/model/state';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CityAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    private utilityService: UtilityService, private router: Router) { }

  states: State[];
  firstFormGroup: FormGroup;
  city: City;
  state: State;

  ngOnInit() {
    this.utilityService.getStates().subscribe((states) => {
      this.states = states;
    });
    this.firstFormGroup = this._formBuilder.group({
      cityName: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  addCity(value) {
    this.utilityService.getStateByName(value.state).subscribe((state) => {
      this.state = state[0];
      this.city = {
        'name': value.cityName,
        'state': value.state,
        'stateId': this.state.id
      } as City;
      this.utilityService.addCity(this.city).subscribe((city) => {
        this.city = city;
        this.router.navigate(['admin/city-list']);
      });
    });

  }

}
