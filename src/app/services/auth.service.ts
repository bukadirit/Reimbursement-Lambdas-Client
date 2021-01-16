import { BehaviorSubject, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public adminStatus = new BehaviorSubject<boolean>(this.checkAdminStatus());
  constructor() {}

  async signIn(username: string, password: string) {
    return await Auth.signIn(username, password);
  }

  async signOut() {
    return await Auth.signOut();
  }

  async getAthenticatedUser() {
    return await Auth.currentAuthenticatedUser({ bypassCache: true });
  }

  async getUserInfo() {
    return await Auth.currentUserInfo();
  }

  async getCurrentSession() {
    return await Auth.currentSession();
  }

  getToken() {
    return from(
      Auth.currentSession().then((data) => {
        return data.getIdToken().getJwtToken();
      })
    );
  }

  async isAdmin() {
    return await Auth.currentSession().then((result) => {
      return result.getIdToken().payload['cognito:groups'];
    });
  }

  async confirmNewpassword(user: any, password: string) {
    return await Auth.completeNewPassword(user, password);
  }

  async updateAttributes(details: any) {
    const user = await Auth.currentAuthenticatedUser();
    return await Auth.updateUserAttributes(user, details);
  }

  checkLoginStatus(): boolean {
    const session = this.getUserInfo()
      .then((result) => {
        if (result) {
          return this.loginStatus.next(true);
        }
      })
      .catch((error) => {
        console.log(error);
        return this.loginStatus.next(false);
      });

    return;
  }

  checkAdminStatus(): boolean {
    this.isAdmin()
      .then((roles) => {
        for (let role of roles) {
          if (role == 'Admin') {
            return this.adminStatus.next(true);
          }
        }
        return this.adminStatus.next(false);
      })
      .catch((error) => {
        console.log(error);
        return this.adminStatus.next(false);
      });
    return;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get isAdministrator() {
    return this.adminStatus.asObservable();
  }
}
