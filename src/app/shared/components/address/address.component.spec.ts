import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from '../../../user/services/profile.service';
import { Profile } from '../../../user/model/Profile';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let httpMock: HttpTestingController;
  let profileService: ProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressComponent],
      providers: [CartService, ProfileService],
      imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,
        MatSelectModule, HttpClientModule, MatSnackBarModule, BrowserAnimationsModule, HttpClientTestingModule]
    });
    profileService = TestBed.get(ProfileService);
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(AddressComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.firstFormGroup.valid).toBeFalsy();
  });

  it('address field validity', () => {
    const address = component.firstFormGroup.controls['address'];
    expect(address.valid).toBeFalsy();
  });

  it('expect form to be valid', () => {
    component.firstFormGroup.controls['address'].setValue('Kalinga Square Mindtree ltd');
    component.firstFormGroup.controls['city'].setValue('Bhubaneswar');
    component.firstFormGroup.controls['state'].setValue('Odisha');
    component.firstFormGroup.controls['zipCode'].setValue(123456);
    expect(component.firstFormGroup.valid).toBeTruthy();
  });

  it('expect at least one request', () => {
    profileService.getProfile('1').subscribe();
    const productsRequest = httpMock.expectOne('http://localhost:7070/api/profiles/?userID=1');
  });
});

