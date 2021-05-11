import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { Tour } from 'src/app/shared/models/tour';
import { TourFare } from 'src/app/shared/models/types/tour-fare.type';
import { TourType } from 'src/app/shared/models/types/tour.type';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { TourService } from 'src/app/shared/services/tour.service';
import { environment } from 'src/environments/environment';

const APIEndpoint = environment.APIEndpoint;

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;

  tourSub!: Subscription;

  tours: Tour[] = [];

  constructor(
    private router: Router,
    private tourService: TourService,
    private storageService: TokenStorageService // private dtoService: DataTransferService
  ) {}

  ngOnInit(): void {
    this.tourSub = this.tourService.getAll().subscribe((response) => {
      console.log('tourService: ', response);
      this.tours = response;
    });
  }

  getTourFare(tour: Tour): string {
    let tourFare: string = '';
    switch (tour.tour_fare) {
      case TourFare.ECONOM:
        tourFare = 'Эконом';
        break;
      case TourFare.MEDIUM:
        tourFare = 'Люкс';
        break;
      case TourFare.VIP:
        tourFare = 'VIP';
        break;
      default:
        break;
    }
    return tourFare;
  }

  getTourType(tour: Tour): string {
    let tourType: string = '';
    switch (tour.tour_type) {
      case TourType.HAJJ:
        tourType = 'Хадж';
        break;
      case TourType.UMRAH:
        tourType = 'Умра';
        break;
      default:
        break;
    }
    return tourType;
  }

  getTourImage(tour: Tour) {
    let src = '../../../assets/images/auth-page/wellcome.png';
    if (tour && tour.photos && tour.photos.length > 0) {
      src = APIEndpoint + '/mediafiles/files/' + tour.photos[0].filename;
    }
    return src;
  }

  goToDetail(tour: Tour) {
    // this.dtoService.saveSelectedTour(tour);
    this.storageService.saveTour(tour);
    this.router.navigate([this.routers.TOUR_DETAIL]);
  }

  signOut() {
    this.router.navigate([this.routers.WELLCOME]);
  }

  ngOnDestroy(): void {
    if (this.tourSub) {
      this.tourSub.unsubscribe();
    }
  }
}
