import { NumberFormatPipe } from './shared/pipes/number.pipe';
import { PwaService } from './shared/services/pwa.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxCurrencyModule } from 'ngx-currency';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { OrderFailComponent } from './pages/order-fail/order-fail.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { PersonalDataFormComponent } from './pages/personal-data-form/personal-data-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignInComponent } from './pages/sign-in/sign-in-form.component';
import { SignUpVerifyComponent } from './pages/sign-up-verify/sign-up-verify.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TourBuyFormComponent } from './pages/tour-buy-form/tour-buy-form.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
import { WalletDepositComponent } from './pages/wallet-deposit/wallet-deposit.component';
import { WellcomePageComponent } from './pages/wellcome/wellcome-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthService } from './shared/services/auth.service';
import { DataTransferService } from './shared/services/data-transfer.service';
import { OrderService } from './shared/services/order.service';
import { PersonDataService } from './shared/services/person-data.service';
import { TokenStorageService } from './shared/services/token-storage.service';
import { TourService } from './shared/services/tour.service';
import { UIService } from './shared/services/ui.service';
import { WalletService } from './shared/services/wallet.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PromptComponent } from './shared/components/prompt/prompt.component';
import { MyToursComponent } from './pages/my-tours/my-tours.component';
import { MyTourDetailComponent } from './pages/my-tour-detail/my-tour-detail.component';
import { AuthInterceptor } from './shared/guard/auth.intercepter';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

const initializer = (pwaService: PwaService) => () =>
  pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    WellcomePageComponent,
    SignUpComponent,
    PersonalDataFormComponent,
    CatalogComponent,
    TourDetailComponent,
    HeaderComponent,
    SignUpVerifyComponent,
    TourBuyFormComponent,
    OrderSuccessComponent,
    OrderFailComponent,
    ProfileComponent,
    WalletDepositComponent,
    ForgetPasswordComponent,
    MyToursComponent,
    MyTourDetailComponent,
    PromptComponent,
    NumberFormatPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    IvyCarouselModule,
    NgxCurrencyModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatBottomSheetModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  entryComponents: [HeaderComponent, PromptComponent, MyToursComponent],
  exports: [NumberFormatPipe],
  providers: [
    AuthService,
    PersonDataService,
    TokenStorageService,
    TourService,
    DataTransferService,
    OrderService,
    UIService,
    NumberFormatPipe,
    WalletService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [PwaService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
