import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { AuthDTO, User } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public routers: typeof routes = routes;

  isAlreadyRegister = false;
  arePassNotMatch = false;

  hide: boolean = true;

  authSub: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = new FormGroup({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
          ),
        ])
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      repeat_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      isAgree: new FormControl(false),
    });
  }

  get password1() {
    return this.form.get('password');
  }

  get password2() {
    return this.form.get('repeat_password');
  }

  get isAgree() {
    return this.form.get('isAgree');
  }

  public ngOnInit(): void {}

  public register(): void {
    if (this.form.valid) {
      let formData: AuthDTO = this.form.value;
      formData.username = '7' + formData.username;
      this.authSub = this.authService.register(formData).subscribe(
        (response) => {
          this.isAlreadyRegister = false;
          this.tokenStorage.saveUser(response);
          this.tokenStorage.saveToken(response.auth_token);
          this.router.navigate([this.routers.SIGN_UP_VERIFY]);
        },
        () => {
          this.isAlreadyRegister = true;
        }
      );
    }
  }

  checkPasswordsForEquality() {
    if (
      this.password1?.value != this.password2?.value &&
      this.password2?.value.length > 0
    ) {
      this.arePassNotMatch = true;
    } else {
      this.arePassNotMatch = false;
    }
  }

  goBack(): void {
    this.router.navigate([this.routers.WELLCOME]);
  }

  goToLogin(): void {
    this.router.navigate([this.routers.SIGN_IN]);
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
