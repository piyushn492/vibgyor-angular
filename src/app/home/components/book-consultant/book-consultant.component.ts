import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BookConsultantService } from 'src/app/home/services/book-consultant.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { ArraySortPipe } from '../../../shared/pipes/arraySort.pipes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-consultant',
  templateUrl: './book-consultant.component.html',
  styleUrls: ['./book-consultant.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1200, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class BookConsultantComponent implements OnInit {

  paintTypes = ['Fresh', 'Repaint'];
  paintCatalog = ['Interior', 'Exterior'];

  fullName = new FormControl('', Validators.required);
  mobile = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);
  paintDesc = new FormControl('', Validators.required);
  pincode = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?!(0))[0-9]{6})$/)
  ]);
  address = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder, private bookService: BookConsultantService, public snackBar: MatSnackBar,
     public router: Router) {

  }

  contactForm: FormGroup = this.formBuilder.group({
    fullName: this.fullName,
    mobile: this.mobile,
    paintDesc: this.paintDesc,
    pincode: this.pincode,
    address: this.address
  });

  ngOnInit() {
  }

  book(value) {
    this.bookService.addRequest(value).subscribe((addedRequest) => {
      this.contactForm.reset('');
      // console.log('Done !');
      this.snackBar.open('Thank You ! Our Consultant will get back to you.', '', {
        duration: 2000,
      });
      this.router.navigate(['']);
    });
  }
}
