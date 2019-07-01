import { TestBed, inject } from '@angular/core/testing';

import { EnquiryServiceService } from './enquiry-service.service';

describe('EnquiryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnquiryServiceService]
    });
  });

  it('should be created', inject([EnquiryServiceService], (service: EnquiryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
