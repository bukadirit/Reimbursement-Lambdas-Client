import { CognitoUser } from 'amazon-cognito-identity-js';
import { validateLogin, getErrors } from './../helpers/helper.functions';
import { AuthService } from './../auth.service';
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
    await this.service
      .confirmNewpassword(this.user, this.newPassword)
      .then((success) => {
        this.router.navigate(['portal']);
        this.service.loginStatus.next(true);
      })
      .catch((error) => {
        this.openSnackBar(error.message);
      });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'purple-snackbar',
    });
  }
}
