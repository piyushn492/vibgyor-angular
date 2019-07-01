import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../products/services/product.service';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthguardGuard } from '../user/guards/authguard.guard';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MyordersComponent } from './components/myorders/myorders.component';


const childRoutes: Routes = [
  {
    path: 'view',
    component: CartViewComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'orders',
    component: MyordersComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(childRoutes),
    MatCardModule,
    FlexLayoutModule,
    MatTableModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [CartViewComponent, CheckoutComponent, CardComponent, MyordersComponent],
  providers: [ ProductService]
})
export class CartModule { }
