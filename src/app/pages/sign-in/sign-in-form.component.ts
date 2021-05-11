import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { AuthDTO, User } from 'src/app/shared/models';
import { Wallet } from 'src/app/shared/models/wallet';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public routers: typeof routes = routes;

  hide: boolean = true;

  isAuthFailed = false;

  authSub: Subscription | undefined;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private walletService: WalletService
  ) {
    this.form = new FormGroup({
      username: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
          ),
        ])
      ),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
    });
  }

  public ngOnInit(): void {}

  public login(): void {
    if (this.form.valid) {
      let formData: AuthDTO = this.form.value;
      formData.username = '7' + formData.username;
      this.authSub = this.authService.login(formData).subscribe(
        (response) => {
          this.tokenStorage.saveUser(response);
          this.tokenStorage.saveToken(response.auth_token);
          this.router.navigate([this.routers.TOUR_LIST]);
        },
        (error) => {
          this.isAuthFailed = true;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
