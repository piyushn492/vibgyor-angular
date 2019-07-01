import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { CartService } from './shared/services/cart.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductFilter } from './shared/pipes/productFilter.pipes';
import { ArraySortPipe } from './shared/pipes/arraySort.pipes';
import { NgProgressModule } from 'ngx-progressbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressInterceptor } from 'ngx-progressbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChartsModule } from 'ng2-charts';
import { ChangeColorDirective } from './directives/change-color.directive';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'src/app/home/home.module#HomeModule'
  },
  {
    path: '',
    loadChildren: 'src/app/home/home.module#HomeModule'
  },
  {
    path: 'catalog',
    loadChildren: 'src/app/catalog/catalog.module#CatalogModule'
  },
  {
    path: 'product',
    loadChildren: 'src/app/products/products.module#ProductsModule'
  },
  {
    path: 'cart',
    loadChildren: 'src/app/cart/cart.module#CartModule'
  },
  {
    path: 'user',
    loadChildren: 'src/app/user/user.module#UserModule'
  },
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    NavbarComponent,
    ProductFilter,
    ArraySortPipe,
    ChangeColorDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    NgProgressModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ChartsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ CartService, { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
