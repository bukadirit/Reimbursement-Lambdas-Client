import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    return await this.authService
      .getUserInfo()
      .then((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['']);
        return false;
      })
      .catch((error) => {
        this.router.navigate(['']);
        return false;
      });
  }
}
//Another promise implemntation
// return new Promise((resolve) => {
//   this.authService
//     .getAthenticatedUser()
//     .then((user) => {
//       console.log(user);
//       if (user) {
//         resolve(true);
//       }
//     })
//     .catch(() => {
//       console.log('No User');
//       this.router.navigate(['/']);
//       resolve(false);
//     });
// });
