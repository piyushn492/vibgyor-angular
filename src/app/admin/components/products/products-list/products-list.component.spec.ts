import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { MatFormFieldModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import { MatTableModule , MatInputModule} from '@angular/material';
// import { MatTableDataSource } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ { provide:  MAT_DIALOG_DATA,  useValue:  {} },
        { provide:  MatDialogRef,  useValue:  {} }, MatDialog, Overlay ],
      imports: [MatFormFieldModule, MatTableModule, BrowserAnimationsModule, MatInputModule,  HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
