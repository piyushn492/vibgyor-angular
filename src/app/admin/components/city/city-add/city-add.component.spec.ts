import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAddComponent } from './city-add.component';
import { ReactiveFormsModule, FormsModule,  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatButtonModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('CityAddComponent', () => {
  let component: CityAddComponent;
  let fixture: ComponentFixture<CityAddComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAddComponent ],
      providers: [{ provide:  MAT_DIALOG_DATA,  useValue:  {} },
        { provide:  MatDialogRef,  useValue:  {} }, { provide: Router, useValue: routerSpy }],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,
        HttpClientTestingModule, MatSelectModule, MatButtonModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
