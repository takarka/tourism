import { NumberFormatPipe } from './../../shared/pipes/number.pipe';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { OrderItem } from 'src/app/shared/models/order';
import { Tour } from 'src/app/shared/models/tour';
import { OrderService } from 'src/app/shared/services/order.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { WalletOneDTO } from './../../shared/models/wallet-one-dto';
import { Wallet } from 'src/app/shared/models/wallet';

@Component({
  selector: 'app-tour-buy-form',
  templateUrl: './tour-buy-form.component.html',
  styleUrls: ['./tour-buy-form.component.scss'],
})
export class TourBuyFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public routers: typeof routes = routes;

  public selectedTour: Tour = new Tour();
  public walletCurrentAmount: number = 0;

  useDeposit: boolean = false;
  totalAmount: number = 0;

  orderSub: Subscription | undefined;
  walletSub: Subscription | undefined;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private walletService: WalletService,
    private formatPipe: NumberFormatPipe,
    private tokenStorage: TokenStorageService
  ) {}

  public ngOnInit(): void {
    this.selectedTour =
      this.tokenStorage.getTour() != null
        ? this.tokenStorage.getTour()
        : new Tour();
    this.totalAmount = this.selectedTour?.price! - 0;

    this.getWalletInfo();

    this.form = new FormGroup({
      passport_id: new FormControl('', [Validators.required]),
      tour: new FormControl(this.selectedTour?.id),
      is_foreigner: new FormControl(false),
    });
  }

  public buyOrder(): void {
    console.log('FORM: ', this.form.value);
    const deposit = this.useDeposit;
    const order_items: OrderItem[] = [];
    order_items.push(this.form.value);
    this.orderSub = this.orderService
      .create({ deposit, order_items })
      .subscribe((response) => {
        console.log('Response: ', response);
        if (response.paid) {
          this.router.navigate([this.routers.ORDER_SUCCESS], {
            queryParams: { transactionType: 2 },
          });
        } else {
          this.goToPaymentWidget(response);
        }
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

  useDepositChanged(checked: boolean): void {
    this.useDeposit = checked;
    if (checked) {
      this.totalAmount = this.selectedTour?.price! - this.walletCurrentAmount;
    } else {
      this.totalAmount = this.selectedTour?.price! - 0;
    }
    console.log('totalAmount: ', this.totalAmount);
    console.log('selectedTour.price: ', this.selectedTour?.price);
  }

  private getWalletInfo(): void {
    this.walletSub = this.walletService.get().subscribe((response) => {
      const myWallet = response && response[0] ? response[0] : new Wallet();
      console.log('myWallet: ', myWallet);
      this.walletCurrentAmount = myWallet.current_amount
        ? myWallet.current_amount
        : 0;
    });
  }

  public getTotalAmount() {
    if (this.totalAmount <= 0) {
      return (
        'Списать с депозита ' +
        this.formatPipe.transform(this.selectedTour.price! - 0)
      );
    } else {
      return 'Оплатить c карты ' + this.formatPipe.transform(this.totalAmount - 0);
    }
  }

  goBack(): void {
    this.router.navigate([this.routers.TOUR_DETAIL]);
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }
}
