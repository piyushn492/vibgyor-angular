import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocatorComponent } from './store-locator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatCardModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StoreLocatorComponent', () => {
  let component: StoreLocatorComponent;
  let fixture: ComponentFixture<StoreLocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
        MatCardModule, MatAutocompleteModule, BrowserAnimationsModule ],
      declarations: [ StoreLocatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
