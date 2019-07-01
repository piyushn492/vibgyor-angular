// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { CatalogViewComponent } from './catalog-view.component';
// import { MatCardModule } from '@angular/material';
// import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { CartService } from '../../../shared/services/cart.service';

// describe('CatalogViewComponent', () => {
//   let component: CatalogViewComponent;
//   let fixture: ComponentFixture<CatalogViewComponent>;
//   const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//   const fakeActivatedRoute = {
//     // snapshot: { data: { ... } }
//   } as ActivatedRoute;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [MatCardModule, HttpClientTestingModule],
//       providers: [{ provide: Router, useValue: routerSpy }, {provide: ActivatedRoute, useValue: fakeActivatedRoute},
//         CartService],
//       declarations: [ CatalogViewComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CatalogViewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
