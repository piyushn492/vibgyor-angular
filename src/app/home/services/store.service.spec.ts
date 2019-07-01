import { TestBed, inject } from '@angular/core/testing';

import { StoreService } from './store.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';

describe('StoreService', () => {
  let storeService: StoreService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService],
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    storeService = TestBed.get(StoreService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([StoreService], (service: StoreService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a get getAllStores available', inject([StoreService], (service: StoreService) => {
    expect(service.addNewStore).toBeTruthy();
  }));

  it(`should issue a GET request`, inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('http://localhost:7070/api/stores').subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      });
    }));

  it('should return the list cities based on state name', (done) => {

    storeService.getCities()
      .subscribe(cities => {
        expect(cities.length).toBeGreaterThan(2),
          done();
      });

    const productsRequest = httpMock.expectOne('http://localhost:7070/api/cities');
    productsRequest.flush([{ id: 1, stateId: 1, name: 'Bhubaneswar' }, { id: 2, stateId: 1, name: 'Rayagada' },
     { id: 3, stateId: 1, name: 'Ganjam' }]);
    httpMock.verify();
  });

  it('should return the list cities based on state name', (done) => {

    storeService.searchCitiess('Rayagada')
      .subscribe(cities => {
        // expect(cities.length).toBe(1),
          done();
      });

    const productsRequest = httpMock.expectOne('http://localhost:7070/api/cities?q=Rayagada');
    productsRequest.flush({ id: 2, stateId: 1, name: 'Rayagada' });
    httpMock.verify();
  });

});
