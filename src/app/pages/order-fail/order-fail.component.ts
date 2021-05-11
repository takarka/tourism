import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/consts/routes';

@Component({
  selector: 'app-order-fail',
  templateUrl: './order-fail.component.html',
  styleUrls: ['./order-fail.component.scss'],
})
export class OrderFailComponent implements OnInit {
  public routers: typeof routes = routes;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    // this.routeSub = this.actRoute.queryParams.subscribe((params) => {
    //   this.transactionType = params.transactionType;
    // });
  }

  public goToCatalog(): void {
    this.router.navigate([this.routers.TOUR_LIST]);
    return;
  }
}
