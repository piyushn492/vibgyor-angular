import { TestBed, inject } from '@angular/core/testing';

import { ContactUsService } from './contact-us.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilityService } from '../../shared/services/utility.service';
import { ContactUs } from '../model/contact-us';

describe('ContactUsService', () => {
    let conatcUsService: ContactUsService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContactUsService, UtilityService]
        });
        conatcUsService = TestBed.get(ContactUsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([ContactUsService], (service: ContactUsService) => {
        expect(service).toBeTruthy();
    }));

    it('should call add contact', inject([ContactUsService], (service: ContactUsService) => {
        this.contactus = {
            fullName: 'sambit',
            email: 'sam@gmail.com',
            mobile: 123456789,
            pincode: 12345678
        } as ContactUs;
        conatcUsService.addContactUs(this.ContactUs)
            .subscribe(conact => {
                expect(conact['id']).toBe(1);
                // done();
            });

        const productsRequest = httpMock.expectOne('http://localhost:7070/api/contactus', this.contactus);
        productsRequest.flush({ id: 1, fullName: 'sambit' });
        httpMock.verify();
    }));
});
