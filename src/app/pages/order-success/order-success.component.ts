import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { AuthDTO, User } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;

  routeSub: Subscription | undefined;

  transactionType: number | undefined;

  successTour: string =
    'Вы успешно купили тур! Свой тур и детали тура можете посмотреть на профиле.';

  successDeposit: string =
    'Вы  успешно пополнили свой счет на сайте. Эти деньги считается как депозит, и в любое время вы можете оплатить туры через депозит.';

  constructor(private router: Router, private actRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.routeSub = this.actRoute.queryParams.subscribe((params) => {
      this.transactionType = params.transactionType;
    });
  }

  public goToCatalog(): void {
    this.router.navigate([this.routers.TOUR_LIST]);
    return;
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
