import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { AuthDTO } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public routers: typeof routes = routes;

  INFO_TITLE: string = 'Восстановить пароль';
  INFO_TEXT: string = 'Укажите номер телефона, на который мы отправим пароль';

  SUCCESS_TITLE: string = 'Отлично!';
  SUCCESS_TEXT: string =
    'Мы отправили вам пароль. Этот пароль будет вашим паролем для входа.';

  title: string = this.INFO_TITLE;
  text: string = this.INFO_TEXT;

  isRestored: boolean = false;
  isAuthFailed: boolean = false;

  authSub: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
        ),
      ]),
    });
  }

  public ngOnInit(): void {}

  public restore(): void {
    if (this.form.valid) {
      let formData: AuthDTO = this.form.value;
      formData.username = '7' + formData.username;
      this.authSub = this.authService.restore(formData).subscribe(
        (response) => {
          this.isRestored = true;
          this.isAuthFailed = false;
          console.log('Restore: ', response);
          this.title = this.SUCCESS_TITLE;
          this.text = this.SUCCESS_TEXT;
        },
        (error) => {
          this.isAuthFailed = true;
          this.isRestored = false;
        }
      );
    }
  }

  public goToSignIn(): void {
    this.router.navigate([this.routers.SIGN_IN]);
  }

  goBack(): void {
    this.router.navigate([this.routers.WELLCOME]);
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
