import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { MatFormFieldModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import { MatTableModule , MatInputModule} from '@angular/material';
// import { MatTableDataSource } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ ],
      imports: [MatFormFieldModule, MatTableModule, BrowserAnimationsModule, MatInputModule,  HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
