import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public loginStatus$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private service: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginStatus$ = this.service.isLoggesIn;
  }

  async doLogout() {
    try {
      await this.service.signOut();
      this.service.loginStatus.next(false);
      this.router.navigate(['']);
      this.openSnackBar('You Have Successfully Logout!');
    } catch (error) {
      this.openSnackBar(error.message);
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
