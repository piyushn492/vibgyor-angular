import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignupComponent],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} }, { provide: Router, useValue: routerSpy }],
            imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientTestingModule,
                RouterTestingModule, BrowserAnimationsModule, MatSelectModule, MatSnackBarModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should route to sign up page', () => {
        component.signIn();
        expect(routerSpy.navigate('user/signup'));
    });
});
