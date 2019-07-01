import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatalogService } from './catalog.service';
import { BookConsultantService } from '../../home/services/book-consultant.service';

describe('CatalogService', () => {
    let catalogService: CatalogService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CatalogService, BookConsultantService]
        });
        catalogService = TestBed.get(CatalogService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([CatalogService], (service: CatalogService) => {
        expect(service).toBeTruthy();
    }));
});
