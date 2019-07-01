import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../user/model/user';
import { UserService } from '../../../../user/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    private userService: UserService, public dialog: MatDialog) { }
  firstFormGroup: FormGroup;
  user: User;

  ngOnInit() {
    // console.log(this.data.value['roles']);
    this.firstFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      emailID: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.firstFormGroup.get('fullName').setValue(this.data.value['name']);
    this.firstFormGroup.get('emailID').setValue(this.data.value['username']);
    this.firstFormGroup.get('password').setValue(this.data.value['password']);
  }

  editUsre(value) {
    this.user = {
      'name': value['fullName'],
      'roles': this.data.value['roles'],
      'username': value['emailID'],
      'password': value['password'],
      'social': false
    } as User;
    this.userService.updateUser(this.user).subscribe();
  }

}
