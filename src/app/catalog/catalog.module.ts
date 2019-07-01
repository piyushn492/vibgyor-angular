import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { MatCardModule } from '@angular/material/card';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CatalogService } from './services/catalog.service';
import { CatalogViewComponent } from './components/catalog-view/catalog-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

const childRoutes: Routes = [
  {
    path: 'list',
    component: CatalogListComponent
  },
  {
    path: 'view/:id',
    component: CatalogViewComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forChild(childRoutes),
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule
  ],
  declarations: [CatalogListComponent, CatalogViewComponent],
  providers: [CatalogService]
})
export class CatalogModule { }
