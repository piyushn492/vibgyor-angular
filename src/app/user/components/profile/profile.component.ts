import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
// import { AddressComponent } from '../../../shared/components/address/address.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private userService: UserService) { }
  isLoggedIn: Boolean;
  user: User;
  userName: string;
  email: string;
  span = document.getElementsByClassName('close')[0];
  newPassword: string;
  currentPassword: string;
  @ViewChild('myForm') public profileForm: NgForm;

  ngOnInit() {
    this.authService.authStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.authService.user$.subscribe((user) => {
          this.user = user;
          this.userName = this.user.name;
          this.email = this.user.username;
        });
      }
    });
  }

  hideModal() {
    document.getElementById('myModal').style.display = 'none';
  }

  showDetails() {
    document.getElementById('myModal').style.display = 'block';
  }

  updatePassword() {
    this.userService.getUsersByID(this.user['id']).subscribe((user) => {
      this.user = user;
    });
    if (this.user.password === this.currentPassword) {
      this.user.password = this.newPassword;
      this.userService.updateUser(this.user).subscribe((user) => {
        this.snackBar.open('Password updated successfullly !', '', {
          duration: 5000,
        });
        document.getElementById('myModal').style.display = 'none';
      });
    } else if (this.user.password !== this.currentPassword) {
      this.snackBar.open('Current password incorrect !', '', {
        duration: 5000,
      });
    }
  }

  updateUserName() {
    this.user.name = this.userName;
    this.userService.updateUser(this.user).subscribe((user) => {
      // console.log(this.user);
      this.snackBar.open('Name updated successfullly !', '', {
        duration: 5000,
      });
    });
  }
}
