import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAddComponent } from './products-add.component';
import { ReactiveFormsModule, FormsModule,  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatButtonModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsAddComponent', () => {
  let component: ProductsAddComponent;
  let fixture: ComponentFixture<ProductsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsAddComponent ],
      providers: [ { provide:  MAT_DIALOG_DATA,  useValue:  {} },
        { provide:  MatDialogRef,  useValue:  {} }, ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,
        HttpClientTestingModule, MatSelectModule, MatButtonModule, BrowserAnimationsModule,
        RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
