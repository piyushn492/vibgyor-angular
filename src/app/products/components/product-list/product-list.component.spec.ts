import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ElementRef } from '@angular/core';
import { Paint } from '../../model/paint';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatRadioModule, MatSliderModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    const infinitescrolldistance = '2';
    // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // let productService: ProductService;

    //   var element: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterModule.forRoot([]), InfiniteScrollModule, MatRadioModule,
                FormsModule, ReactiveFormsModule, MatSliderModule, MatCardModule
            ],
            providers: [ { provide: APP_BASE_HREF, useValue: '/' }, CartService],
            declarations: [ProductListComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
