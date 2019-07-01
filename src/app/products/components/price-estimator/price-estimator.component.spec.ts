import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEstimatorComponent } from './price-estimator.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookConsultantService } from '../../../home/services/book-consultant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PriceEstimatorComponent', () => {
  let component: PriceEstimatorComponent;
  let fixture: ComponentFixture<PriceEstimatorComponent>;
  let httpMock: HttpTestingController;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const fakeActivatedRoute = {
    // snapshot: { data: { ... } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ PriceEstimatorComponent ],
      providers: [BookConsultantService,  { provide: Router, useValue: routerSpy }, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    });
    // bookConsultantService = TestBed.get(BookConsultantService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceEstimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
