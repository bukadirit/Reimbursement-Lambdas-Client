import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  constructor() {}

  async signIn(username: string, password: string) {
    return await Auth.signIn(username, password);
  }

  async signOut() {
    return await Auth.signOut();
  }

  async getAthenticatedUser() {
    return Auth.currentAuthenticatedUser({ bypassCache: false });
  }

  async getCurrentSession() {
    return Auth.currentSession();
  }

  async confirmNewpassword(user: any, password: string) {
    return Auth.completeNewPassword(user, password);
  }

  checkLoginStatus(): boolean {
    return localStorage.getItem(
      'CognitoIdentityServiceProvider.7bpbkecl8buj86lq97t3b1vudd.htrawally.idToken'
    ) == null
      ? false
      : true;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }
}
