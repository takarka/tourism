import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/consts/routes';
import { AuthDTO, User } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-wellcome-page',
  templateUrl: './wellcome-page.component.html',
  styleUrls: ['./wellcome-page.component.scss'],
})
export class WellcomePageComponent {
  public routers: typeof routes = routes;

  constructor(private router: Router) {}

  signIn(): void {
    this.router.navigate([this.routers.SIGN_IN]);
    // this.router.navigate([this.routers.ORDER_SUCCESS]);
  }

  signUp(): void {
    this.router.navigate([this.routers.SIGN_UP]).then();
  }
}
