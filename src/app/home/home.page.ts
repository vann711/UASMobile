import { Component } from '@angular/core';
import { AuthService } from '../Authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{

  constructor(private authService: AuthService) {}

  logout() 
  {
    this.authService.logoutUser();
  }
}
