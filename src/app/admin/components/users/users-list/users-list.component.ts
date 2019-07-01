import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../user/services/user.service';
import { User } from '../../../../user/model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog) { }
  users: User[];
  adminUsers: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.users.forEach((user) => {
        if (user.roles.includes('admin') || user.roles.includes('staff')) {
          this.adminUsers.push(user);
        }
      });
    });
  }

  addUser() {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(UserAddComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        this.adminUsers = [];
        this.users.forEach((user) => {
          if (user.roles.includes('admin') || user.roles.includes('staff')) {
            this.adminUsers.push(user);
          }
        });
      });
    });
  }

  editUser(value) {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(UserEditComponent, {
      width: '250px',
      data: { value }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        this.adminUsers = [];
        this.users.forEach((user) => {
          if (user.roles.includes('admin') || user.roles.includes('staff')) {
            this.adminUsers.push(user);
          }
        });
      });
    });
  }

  deleteUser(value) {
    this.userService.deleteUser(value.id).subscribe();
  }


}
