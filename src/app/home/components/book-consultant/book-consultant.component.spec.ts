import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookConsultantComponent } from './book-consultant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('BookConsultantComponent', () => {
  let component: BookConsultantComponent;
  let fixture: ComponentFixture<BookConsultantComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule,
         HttpClientTestingModule, MatSnackBarModule, MatInputModule, BrowserAnimationsModule],
      providers: [ CartService, { provide: Router, useValue: routerSpy } ],
      declarations: [ BookConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
