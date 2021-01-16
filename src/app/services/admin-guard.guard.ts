import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    return await this.authService
      .isAdmin()
      .then((roles) => {
        for (let role of roles) {
          if (role == 'Admin') {
            return true;
          }
        }
        this.router.navigate(['/portal']);
        return false;
      })
      .catch((error) => {
        this.router.navigate(['/portal']);
        return false;
      });
  }
}
