import { CognitoUser } from 'amazon-cognito-identity-js';
//prettier-ignore
import { validateLogin, getErrors, validateDetails } from './../helpers/helper.functions';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public newPassword: string;
  public requiresNewPassword: boolean = false;
  public firstName: string;
  public lastName: string;
  public preferredName: String;
  private user: CognitoUser;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private service: AuthService
  ) {}

  ngOnInit(): void {}

  async doSubmit() {
    if (validateLogin(this.username, this.password)) {
      try {
        const result = await this.service.signIn(this.username, this.password);
        if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.requiresNewPassword = true;
          this.user = result;
          return;
        }
        this.router.navigate(['portal']);
        this.service.loginStatus.next(true);
        this.service.checkAdminStatus();
      } catch (error) {
        this.openSnackBar(error.message);
        this.router.navigate(['']);
      }
    } else {
      this.openSnackBar('Username and Password are required!');
      this.router.navigate(['']);
    }
  }

  async doConfirm() {
    if (validateDetails(this.firstName, this.lastName, this.newPassword)) {
      const userDetails = {
        given_name: this.firstName,
        family_name: this.lastName,
        nickname: this.preferredName,
      };

      await this.service
        .confirmNewpassword(this.user, this.newPassword)
        .catch((error) => {
          this.openSnackBar(error.message);
        });

      await this.service
        .updateAttributes(userDetails)
        .then((success) => {
          this.router.navigate(['portal']);
          this.service.loginStatus.next(true);
          this.service.checkAdminStatus();
        })
        .catch((error) => {
          this.openSnackBar(error.message);
        });
    } else {
      this.openSnackBar(
        'Please Fillout All Required Fileds. Password Length Must Be At Least 8 Characters.'
      );
    }
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'purple-snackbar',
    });
  }
}
