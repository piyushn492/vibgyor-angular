import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListComponent } from './city-list.component';
import { MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule} from '@angular/material';
import { MatTableModule } from '@angular/material';
// import { MatTableDataSource } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityListComponent ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ { provide:  MAT_DIALOG_DATA,  useValue:  {} },
        { provide:  MatDialogRef,  useValue:  {} }, MatDialog, Overlay ],
      imports: [MatFormFieldModule, BrowserAnimationsModule, MatInputModule, MatTableModule, HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
