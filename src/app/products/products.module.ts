import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from './services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PriceEstimatorComponent } from './components/price-estimator/price-estimator.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSliderModule } from '@angular/material/slider';

const childRoutes: Routes = [
  {
    path: 'view/:id',
    component: ProductViewComponent
  },
  {
    path: 'list',
    component: ProductListComponent
  },
  {
    path: 'price/:id',
    component: PriceEstimatorComponent
  }
];

@NgModule({
  // entryComponents: [ PriceEstimatorComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(childRoutes),
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    InfiniteScrollModule,
    MatSliderModule,
    SharedModule
  ],
  declarations: [ ProductViewComponent, ProductListComponent, PriceEstimatorComponent ],
  providers:    [ ProductService ]
})
export class ProductsModule { }
