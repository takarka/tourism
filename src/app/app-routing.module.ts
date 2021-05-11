import { WalletDepositComponent } from './pages/wallet-deposit/wallet-deposit.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { PersonalDataFormComponent } from './pages/personal-data-form/personal-data-form.component';
import { SignInComponent } from './pages/sign-in/sign-in-form.component';
import { SignUpVerifyComponent } from './pages/sign-up-verify/sign-up-verify.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TourBuyFormComponent } from './pages/tour-buy-form/tour-buy-form.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
import { WellcomePageComponent } from './pages/wellcome/wellcome-page.component';
import { OrderFailComponent } from './pages/order-fail/order-fail.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { MyTourDetailComponent } from './pages/my-tour-detail/my-tour-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    pathMatch: 'full',
    component: WellcomePageComponent,
  },
  {
    path: 'sign-in',
    pathMatch: 'full',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    pathMatch: 'full',
    component: SignUpComponent,
  },
  {
    path: 'sign-up-verify',
    pathMatch: 'full',
    component: SignUpVerifyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forget-password',
    pathMatch: 'full',
    component: ForgetPasswordComponent,
    canActivate: [],
  },
  {
    path: 'fill-data',
    pathMatch: 'full',
    component: PersonalDataFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tour-list',
    pathMatch: 'full',
    component: CatalogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tour-detail',
    pathMatch: 'full',
    component: TourDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tour-buy-form',
    pathMatch: 'full',
    component: TourBuyFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-success',
    pathMatch: 'full',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-fail',
    pathMatch: 'full',
    component: OrderFailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile-my-tour',
    pathMatch: 'full',
    component: MyTourDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-deposit',
    pathMatch: 'full',
    component: WalletDepositComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
