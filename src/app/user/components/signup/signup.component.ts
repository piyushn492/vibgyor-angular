import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Profile } from '../../model/Profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, public snackBar: MatSnackBar, private profileService: ProfileService) { }

  users: User[];
  user: User[];
  emailFound: Boolean = true;
  profile: Profile;

  fullName = new FormControl('', Validators.required);
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6), Validators.maxLength(20)
  ]);
  passwordrepeat = new FormControl('', [
    Validators.required,
    Validators.minLength(6), Validators.maxLength(20)
  ]);


  registrationForm: FormGroup = this.formBuilder.group({
    fullName: this.fullName,
    email: this.email,
    password: this.password,
    passwordrepeat: this.passwordrepeat
  }, { validator: this.passwordMatchValidator });

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordrepeat').value
      ? null : { 'mismatch': true };
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => this.users = users);
  }

  register(value) {
    this.emailFound = false;
    this.userService.checkIfEmailExist(value['email']).subscribe((result) => {
      if (result['result']) {
        this.snackBar.open('Sorry this email address is already registered with us !', '', {
          duration: 2000,
        });
      } else {
        this.userService.addUser(value).subscribe((user) => {
          this.profile = {
            'userID': user['id'],
            'fullName': user['name']
          } as Profile;
          this.profileService.addProfile(this.profile).subscribe((profile) => {
            this.profile = profile;
            this.router.navigate(['user/login']);
          }
          );
        }
        );
      }
    });
  }

  signIn() {
    this.router.navigate(['user/signup']);
  }
}
