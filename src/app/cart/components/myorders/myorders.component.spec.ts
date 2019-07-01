import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyordersComponent } from './myorders.component';
import { CartService } from '../../../shared/services/cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MyordersComponent', () => {
    let component: MyordersComponent;
    let fixture: ComponentFixture<MyordersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CartService],
            imports: [HttpClientTestingModule],
            declarations: [MyordersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyordersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
