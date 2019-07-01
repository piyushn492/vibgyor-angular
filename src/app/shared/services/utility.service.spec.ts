import { TestBed, inject } from '@angular/core/testing';

import { UtilityService } from './utility.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UtilityService', () => {
    let utilityService: UtilityService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UtilityService]
        });
        utilityService = TestBed.get(UtilityService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([UtilityService], (service: UtilityService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the list of states', (done) => {

        utilityService.getStates()
            .subscribe(states => {
                expect(states.length).toBe(2),
                expect(states[0].name).toBe('Odisha'),
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/states/');
        productsRequest.flush([{ id: 1, name: 'Odisha' }, { id: 3, name: 'Karnataka' }]);
        httpMock.verify();
    });

    it('should return the state based on name', (done) => {

        utilityService.getStateByName('Odisha')
            .subscribe(city => {
                expect(city.name).toBe('Odisha'),
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/states/?name=Odisha');
        productsRequest.flush({ id: 1, name: 'Odisha' });
        httpMock.verify();
    });


    it('should return the list cities based on state name', (done) => {

        utilityService.getCities(1)
            .subscribe(cities => {
                expect(cities.length).toBe(2),
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/cities/?stateId=1');
        productsRequest.flush([{ id: 1, stateId: 1, name: 'Bhubaneswar' }, { id: 2, stateId: 1, name: 'Rayagada' }]);
        httpMock.verify();
    });
});
