import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cart } from '../../cart/model/cart';

describe('CartService', () => {
    beforeEach(() => {
        let cartService: CartService;
        let httpMock: HttpTestingController;
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CartService]
        });
        cartService = TestBed.get(CartService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([CartService], (service: CartService) => {
        expect(service).toBeTruthy();
    }));
});
