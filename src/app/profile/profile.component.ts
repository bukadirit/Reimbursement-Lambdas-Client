import { AuthService } from './../services/auth.service';
import { Attributes, User } from './../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: User = new User(null, null, new Attributes());
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getUserInfo()
      .then((result) => (this.user = result))
      .catch((error) => console.log(error));
  }
}
