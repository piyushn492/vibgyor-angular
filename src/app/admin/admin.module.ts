import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../user/guards/admin.guard';
import { CatalogsListComponent } from './components/catalogs/catalogs-list/catalogs-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CatalogEditComponent } from './components/catalogs/catalog-edit/catalog-edit.component';
import { CatalogAddComponent } from './components/catalogs/catalog-add/catalog-add.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { CityEditComponent } from './components/city/city-edit/city-edit.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreListComponent } from './components/stores/store-list/store-list.component';
import { StoreAddComponent } from './components/stores/store-add/store-add.component';
import { StoreEditComponent } from './components/stores/store-edit/store-edit.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsAddComponent } from './components/products/products-add/products-add.component';
import { ProductsEditComponent } from './components/products/products-edit/products-edit.component';
import { MatPaginatorModule, MatIconModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { ChartsModule } from 'ng2-charts';
import { UserAddComponent } from './components/users/user-add/user-add.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';

const childRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'catalogs/list',
    component: CatalogsListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'catalog-add',
    component: CatalogAddComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'catalog-edit/:id',
    component: CatalogEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'city-list',
    component: CityListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'city-add',
    component: CityEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'store-list',
    component: StoreListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'store-edit',
    component: StoreEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'store-add',
    component: StoreAddComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'product-list',
    component: ProductsListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    ChartsModule
  ],
  entryComponents: [ CityEditComponent, CityAddComponent, StoreEditComponent, StoreAddComponent,
    ProductsEditComponent, ProductsAddComponent, UserAddComponent, UserEditComponent ],
  declarations: [HomeComponent, CatalogsListComponent, CatalogEditComponent,
    CatalogAddComponent, CityListComponent, CityEditComponent, CityAddComponent,
     StoreListComponent, StoreAddComponent, StoreEditComponent, ProductsListComponent,
     ProductsAddComponent, ProductsEditComponent, UsersListComponent, UserAddComponent, UserEditComponent]
})
export class AdminModule { }
