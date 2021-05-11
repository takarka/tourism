import { PersonData } from './../../shared/models/person-data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { Wallet } from 'src/app/shared/models/wallet';
import { PersonDataService } from 'src/app/shared/services/person-data.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthResponseDTO } from './../../shared/models/auth-dto';
import { WalletService } from './../../shared/services/wallet.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Tour } from 'src/app/shared/models/tour';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;

  myWallet: Wallet | undefined;
  myUser: AuthResponseDTO | null;
  myGender: number | undefined;

  routeSub: Subscription | undefined;
  walletSub: Subscription | undefined;
  personDataSub: Subscription | undefined;
  orderSub: Subscription | undefined;

  activeTours: Tour[] = [];
  futureTours: Tour[] = [];

  tabIndex: number = 0;

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private actRoute: ActivatedRoute,
    private walletService: WalletService,
    private orderService: OrderService,
    private personDataService: PersonDataService
  ) {
    this.myUser = this.tokenService.getUser();
  }

  public ngOnInit(): void {
    this.routeSub = this.actRoute.queryParams.subscribe((params) => {
      this.tabIndex = params.tabIndex;
    });
    this.walletSub = this.walletService.get().subscribe((response) => {
      this.myWallet = response && response[0] ? response[0] : new Wallet();
    });
    this.personDataSub = this.personDataService
      .getById(this.myUser?.id)
      .subscribe((response) => {
        console.log('Person: ', response);
        let myPersonData = response ? response : new PersonData();
        if (
          myPersonData &&
          myPersonData.user &&
          myPersonData.user.gender != null
        ) {
          this.myGender = myPersonData.user.gender;
          this.myUser!.first_name = myPersonData.user.first_name
            ? myPersonData.user.first_name
            : '';
          this.myUser!.last_name = myPersonData.user.last_name
            ? myPersonData.user.last_name
            : '';
          console.log('myGender: ', this.myGender);
        }
      });

    this.orderSub = this.orderService.getAll().subscribe((response) => {
      console.log('Orders: ', response);
      const t: Tour[] = [];
      response
        .filter((order) => order.status === 1)
        .forEach((item) => {
          if (item && item.order_items && item.order_items.length > 0) {
            if (item.order_items[0].tour != null) {
              t.push(item.order_items[0].tour);
            }
          }
        });

      console.log('Tours: ', t);
      this.activeTours = t;
    });
  }

  public submit(): void {}

  public forgetPassword(): void {}

  public goToCatalog(): void {
    this.router.navigate([this.routers.TOUR_LIST]);
  }

  public addFunds(): void {
    this.router.navigate([routes.ADD_DEPOSIT]);
    this.router.navigate([routes.ADD_DEPOSIT], {
      queryParams: { walletId: this.myWallet?.id },
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.walletSub) {
      this.walletSub.unsubscribe();
    }
    if (this.personDataSub) {
      this.personDataSub.unsubscribe();
    }
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }
}
