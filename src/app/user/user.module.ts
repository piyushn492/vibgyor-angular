import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from './services/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ProfileComponent } from './components/profile/profile.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { IntercepterService } from './services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SaveAlertGuard } from './guards/save-alert.guard';
import { MatChipsModule } from '@angular/material/chips';


export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('605742889785387')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('504148892379-ndp3th0ogjssj5ur3el896hjf03uqgjp.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}

const childRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canDeactivate: [SaveAlertGuard]
  },
  // {
  //   path: 'testimonials',
  //   component: TestimonialsComponent
  // },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    SocialLoginModule,
    SharedModule,
    MatExpansionModule,
    MatChipsModule
  ],
  declarations: [LoginComponent, SignupComponent,
    //  TestimonialsComponent,
    ProfileComponent, ForbiddenComponent],
  providers: [UserService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    }]
})
export class UserModule { }
