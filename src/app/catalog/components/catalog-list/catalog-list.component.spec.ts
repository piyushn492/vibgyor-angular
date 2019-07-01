import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogListComponent } from './catalog-list.component';
import { CartService } from '../../../shared/services/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('CatalogListComponent', () => {
  let component: CatalogListComponent;
  let fixture: ComponentFixture<CatalogListComponent>;
  // let location: Location;
  // let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [ CatalogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
