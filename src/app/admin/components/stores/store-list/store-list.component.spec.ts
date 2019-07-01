import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListComponent } from './store-list.component';
import { MatFormFieldModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import { MatTableModule , MatInputModule} from '@angular/material';
// import { MatTableDataSource } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreListComponent ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ { provide:  MAT_DIALOG_DATA,  useValue:  {} },
        { provide:  MatDialogRef,  useValue:  {} }, MatDialog, Overlay ],
      imports: [MatFormFieldModule, MatTableModule, BrowserAnimationsModule, MatInputModule,  HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
