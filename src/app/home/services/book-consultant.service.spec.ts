import { TestBed, inject } from '@angular/core/testing';
import { BookConsultantService } from './book-consultant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookConsultantService', () => {
    let bookConsultantService: BookConsultantService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BookConsultantService],
            imports: [HttpClientTestingModule]
        });
        bookConsultantService = TestBed.get(BookConsultantService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([BookConsultantService], (service: BookConsultantService) => {
        expect(service).toBeTruthy();
    }));

    // it('should return all the requests', (done) => {

    //     bookConsultantService.getRequets()
    //         .subscribe(
    //             // done()
    //         );

    //     const productsRequest = httpMock.expectOne('http://localhost:7070/api/conultantRequests');
    //     productsRequest.flush('');
    //     httpMock.verify();
    // });

    // it('should delete a requests', (done) => {

    //     bookConsultantService.deleteRequest('1')
    //         .subscribe(
    //             done()
    //         );

    //     const productsRequest = httpMock.expectOne('http://localhost:7070/api/conultantRequests/1');
    //     productsRequest.flush({ id: 1, name: 'Query' });
    //     httpMock.verify();
    // });
});
