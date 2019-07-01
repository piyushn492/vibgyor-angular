import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from '../../../shared/services/cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


class MockAuthService {

    public isAuthenticated(): Boolean {
        return true;
    }
}

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    // let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} }, CartService],
            imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientTestingModule,
                RouterTestingModule, BrowserAnimationsModule, MatSelectModule, MatSnackBarModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
