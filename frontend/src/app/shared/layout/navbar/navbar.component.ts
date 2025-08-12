import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public authService: AuthenticateService) { }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

}
