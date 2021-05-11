import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  canActivate() {
    if (this.tokenStorage.getToken()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}