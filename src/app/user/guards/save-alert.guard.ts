import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { AddressComponent } from '../../shared/components/address/address.component';
import { ProfileComponent } from '../components/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SaveAlertGuard implements CanDeactivate<ProfileComponent> {
  canDeactivate(component: ProfileComponent): boolean {
    if (component.profileForm.dirty) {
      return confirm('Are you sure, you want to discard your changes ?');
    }

    return true;
  }
}
