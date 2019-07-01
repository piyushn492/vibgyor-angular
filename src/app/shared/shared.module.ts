import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
// import { AddressComponent } from './components/address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './components/address/address.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CardHoverDirective } from './directives/card-hover.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [  AddressComponent, CardHoverDirective ],
  exports: [CommonModule, FormsModule, AddressComponent, CardHoverDirective ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [  ]
    };
  }
}
