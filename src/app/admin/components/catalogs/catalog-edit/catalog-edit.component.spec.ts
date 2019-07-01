import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogEditComponent } from './catalog-edit.component';
import { ReactiveFormsModule, FormsModule,  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CatalogEditComponent', () => {
  let component: CatalogEditComponent;
  let fixture: ComponentFixture<CatalogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogEditComponent ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientTestingModule,
         RouterTestingModule, BrowserAnimationsModule],
      providers: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
