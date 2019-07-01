import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Paint } from '../model/paint';


describe('ProductService', () => {
    let productService: ProductService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService]
        });
        productService = TestBed.get(ProductService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([ProductService], (service: ProductService) => {
        expect(service).toBeTruthy();
    }));


    it('should return data', (done) => {
        productService.getProducts()
            .subscribe(products => {
                expect(products.length).toBe(2);
                expect(products).toEqual(<Paint[]>[{ id: 1, price: 400 }, { id: 2, price: 500 }]);
                expect(products[0].price).toBe(400);
                done();
            });

        // tslint:disable-next-line:prefer-const
        let productsRequest = httpMock.expectOne('http://localhost:7070/api/paints/');
        // respond with json data
        productsRequest.flush([{ id: 1, price: 400 }, { id: 2, price: 500 }]);
        httpMock.verify();
    });

    it('should return good one product', (done) => {

        productService.getProductsById(1)
            .subscribe(product => {
                expect(product.id).toBe(1);
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/paints/?id=1');
        productsRequest.flush({ id: 1 });
        httpMock.verify();
    });

    it('should be able to add paint', (done) => {

        this.paint = {
            'categoryName': 'Interior',
            'name': 'Asian Trends'
        } as Paint;

        productService.addPaint(this.paint )
            .subscribe(paint => {
                expect(paint.id).toBe(1);
                expect(paint.name).toBe('Asian Trends');
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/paints/');
        productsRequest.flush({ id: 1,  categoryName: 'Interior', name: 'Asian Trends' });
        httpMock.verify();
    });

});

