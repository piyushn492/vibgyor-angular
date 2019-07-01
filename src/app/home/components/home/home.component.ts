import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { ContactUs } from 'src/app/home/model/contact-us';
import { ContactUsService } from 'src/app/home/services/contact-us.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(1200, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  contactUs: ContactUs;

  constructor(private _formBuilder: FormBuilder, private contactUsService: ContactUsService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', [
        Validators.required,
        Validators.email
      ]],
      mobileCtrl: ['', [
        Validators.required,
        Validators.minLength(10), Validators.maxLength(10)
      ]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.compose([Validators.required,
      Validators.minLength(6), Validators.maxLength(6)])]
    });
  }

  saveQuery(value1, value2) {

    this.contactUs = {
      'fullName': value1['firstCtrl'],
      'email': value1['emailCtrl'],
      'mobile': value1['mobileCtrl'],
      'pincode': value2['secondCtrl'],
    } as ContactUs;

    this.contactUsService.addContactUs(this.contactUs).subscribe((addedRequest) => {
      // console.log('Done !');
      this.snackBar.open('Thank You ! We will get back to you soon.', '', {
        duration: 4000,
      });
    });
  }

}
