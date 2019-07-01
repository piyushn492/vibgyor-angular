import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../user/model/user';
import { UserService } from '../../../../user/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private userService: UserService, public dialog: MatDialog) { }
  firstFormGroup: FormGroup;
  user: User;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      emailID: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  addUser(value) {
    this.user = {
      'name': value['fullName'],
      'roles': [value['role']],
      'username': value['emailID'],
      'password': value['password'],
      'social': false
    } as User;
    this.userService.addAdmin(this.user).subscribe();
  }

}
