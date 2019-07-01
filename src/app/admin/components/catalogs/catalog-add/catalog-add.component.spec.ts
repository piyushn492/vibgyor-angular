import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogAddComponent } from './catalog-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatCardModule, MatError } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('CatalogAddComponent', () => {
  let component: CatalogAddComponent;
  let fixture: ComponentFixture<CatalogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogAddComponent ],
      imports:  [ ReactiveFormsModule, BrowserAnimationsModule, FormsModule, RouterTestingModule , MatInputModule,
         MatFormFieldModule, HttpClientTestingModule, MatCardModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
