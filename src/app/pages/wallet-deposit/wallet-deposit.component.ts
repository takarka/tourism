import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { WalletOneDTO } from 'src/app/shared/models/wallet-one-dto';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-wallet-deposit',
  templateUrl: './wallet-deposit.component.html',
  styleUrls: ['./wallet-deposit.component.scss'],
})
export class WalletDepositComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public routers: typeof routes = routes;

  walletId: number | undefined;

  routeSub: Subscription | undefined;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private walletService: WalletService
  ) {
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });
  }

  public ngOnInit(): void {
    this.routeSub = this.actRoute.queryParams.subscribe((params) => {
      this.walletId = params.walletId;
    });
  }

  public addDeposit(): void {
    console.log('FORM: ', this.form.value);
    this.walletService
      .addDeposit(this.walletId, this.form.value)
      .subscribe((response) => {
        console.log('Response: ', response);
        this.goToPaymentWidget(response);
      });
  }

  goToPaymentWidget(dto: WalletOneDTO) {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', dto.url);

    form.setAttribute('target', '_self');

    var WMI_MERCHANT_ID = document.createElement('input');
    WMI_MERCHANT_ID.setAttribute('type', 'hidden');
    WMI_MERCHANT_ID.setAttribute('name', 'WMI_MERCHANT_ID');
    WMI_MERCHANT_ID.setAttribute('value', dto.params.WMI_MERCHANT_ID);
    form.appendChild(WMI_MERCHANT_ID);

    var WMI_PAYMENT_NO = document.createElement('input');
    WMI_PAYMENT_NO.setAttribute('type', 'hidden');
    WMI_PAYMENT_NO.setAttribute('name', 'WMI_PAYMENT_NO');
    WMI_PAYMENT_NO.setAttribute('value', dto.params.WMI_PAYMENT_NO);
    form.appendChild(WMI_PAYMENT_NO);

    var WMI_CURRENCY_ID = document.createElement('input');
    WMI_CURRENCY_ID.setAttribute('type', 'hidden');
    WMI_CURRENCY_ID.setAttribute('name', 'WMI_CURRENCY_ID');
    WMI_CURRENCY_ID.setAttribute('value', dto.params.WMI_CURRENCY_ID);
    form.appendChild(WMI_CURRENCY_ID);

    var WMI_PAYMENT_AMOUNT = document.createElement('input');
    WMI_PAYMENT_AMOUNT.setAttribute('type', 'hidden');
    WMI_PAYMENT_AMOUNT.setAttribute('name', 'WMI_PAYMENT_AMOUNT');
    WMI_PAYMENT_AMOUNT.setAttribute('value', dto.params.WMI_PAYMENT_AMOUNT);
    form.appendChild(WMI_PAYMENT_AMOUNT);

    var WMI_SIGNATURE = document.createElement('input');
    WMI_SIGNATURE.setAttribute('type', 'hidden');
    WMI_SIGNATURE.setAttribute('name', 'WMI_SIGNATURE');
    WMI_SIGNATURE.setAttribute('value', dto.params.WMI_SIGNATURE);
    form.appendChild(WMI_SIGNATURE);

    var WMI_SUCCESS_URL = document.createElement('input');
    WMI_SUCCESS_URL.setAttribute('type', 'hidden');
    WMI_SUCCESS_URL.setAttribute('name', 'WMI_SUCCESS_URL');
    WMI_SUCCESS_URL.setAttribute('value', dto.params.WMI_SUCCESS_URL);
    form.appendChild(WMI_SUCCESS_URL);

    var WMI_FAIL_URL = document.createElement('input');
    WMI_FAIL_URL.setAttribute('type', 'hidden');
    WMI_FAIL_URL.setAttribute('name', 'WMI_FAIL_URL');
    WMI_FAIL_URL.setAttribute('value', dto.params.WMI_FAIL_URL);
    form.appendChild(WMI_FAIL_URL);

    var WMI_PTENABLED = document.createElement('input');
    WMI_PTENABLED.setAttribute('type', 'hidden');
    WMI_PTENABLED.setAttribute('name', 'WMI_PTENABLED');
    WMI_PTENABLED.setAttribute('value', dto.params.WMI_PTENABLED);
    form.appendChild(WMI_PTENABLED);

    document.body.appendChild(form);
    console.log('Response: ', form);
    window.open('', '_top');
    form.submit();
  }

  goBack(): void {
    this.router.navigate([this.routers.TOUR_DETAIL]);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
