import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/home/components/home/home.component';
import { AboutUsComponent } from 'src/app/home/components/about-us/about-us.component';
import { ContactUsComponent } from 'src/app/home/components/contact-us/contact-us.component';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { StoreLocatorComponent } from 'src/app/home/components/store-locator/store-locator.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookConsultantComponent } from 'src/app/home/components/book-consultant/book-consultant.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';



const childRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: 'store',
    component: StoreLocatorComponent
  },
  {
    path: 'book',
    component: BookConsultantComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule
  ],
  declarations: [HomeComponent, AboutUsComponent,
    ContactUsComponent,
    StoreLocatorComponent,
    BookConsultantComponent]
})
export class HomeModule { }
