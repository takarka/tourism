import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up-verify',
  templateUrl: './sign-up-verify.component.html',
  styleUrls: ['./sign-up-verify.component.scss'],
})
export class SignUpVerifyComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public routers: typeof routes = routes;

  isAuthFailed = false;

  authSub: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      verify_number: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
    });
  }

  public ngOnInit(): void {}

  public verify(): void {
    if (this.form.valid) {
      this.isAuthFailed = false;
      this.authSub = this.authService
        .verify(this.form.value)
        .subscribe((response) => {
          console.log('Verify: ', response);
          this.router.navigate([this.routers.FILL_PERSON_DATA]);
        });
    }
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
