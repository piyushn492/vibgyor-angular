import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { Profile } from '../model/Profile';

describe('ProfileService', () => {
    let profileService: ProfileService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProfileService]
        });
        profileService = TestBed.get(ProfileService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([ProfileService], (service: ProfileService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the required profile', (done) => {

        profileService.getProfile('1')
            .subscribe(profile => {
                expect(profile.id).toBe(1);
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/profiles/?userID=1');
        productsRequest.flush({ id: 1, userID: '1' });
        httpMock.verify();
    });

    it('should be able to add profile', (done) => {

        this.profile = {
            'userID': 1,
            'address': 'address',
            'fullName': 'fullName',
            'state': 'state',
            'city': 'city',
            'zipCode': 123456
          } as Profile;

        profileService.addProfile(this.profile)
            .subscribe(profile => {
                expect(profile.id).toBe(1);
                expect(profile.userID).toBe(1);
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/profiles/');
        productsRequest.flush({ id: 1, userID: 1 });
        httpMock.verify();
    });


    it('should be able to update profile', (done) => {

        this.profile = {
            'id': 1,
            'fullName': 'fullName2'
          } as Profile;

        profileService.addProfile(this.profile)
            .subscribe(profile => {
                expect(profile.id).toBe(1);
                expect(profile.fullName).toBe('fullName2');
                done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/profiles/');
        productsRequest.flush({ id: 1, fullName: 'fullName2' });
        httpMock.verify();
    });


});
