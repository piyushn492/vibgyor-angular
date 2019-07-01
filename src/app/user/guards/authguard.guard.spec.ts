import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguardGuard } from './authguard.guard';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from '../../shared/services/cart.service';

class MockAuthService {

    public isAuthenticated(): Boolean {
        return true;
    }
}
describe('AuthguardGuard', () => {
    let authGuard: AuthguardGuard;
    let authService: AuthService;
    const router = {
        navigate: jasmine.createSpy('navigate')
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthguardGuard,
                 {provide: AuthService, useClass: MockAuthService}, { provide: Router, useValue: router }, CartService],
            imports: [HttpClientTestingModule]
        });
        authGuard = TestBed.get(AuthguardGuard);
        authService = TestBed.get(AuthService);
    });

    it('should ...', inject([AuthguardGuard], (guard: AuthguardGuard) => {
        expect(guard).toBeTruthy();
    }));

    // it('be able to hit route when user is logged in', () => {
    //     expect(router.navigate).toBe('/user/login');
    // });

    // it('not be able to hit route when user is not logged in', () => {
    //     storageService.isLoggedIn = false;
    //     expect(loggedInGuard.canActivate()).toBe(false);
    // });
});
