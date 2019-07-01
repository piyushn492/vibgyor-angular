import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
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

describe('AdminGuard', () => {

  let authGuard: AuthguardGuard;
  let authService: AuthService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard,
        { provide: Router, useValue: router }, CartService],
   imports: [HttpClientTestingModule]
    });
    authGuard = TestBed.get(AuthguardGuard);
    authService = TestBed.get(AuthService);
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
