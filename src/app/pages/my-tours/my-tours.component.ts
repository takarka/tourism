import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/consts/routes';
import { Tour } from 'src/app/shared/models/tour';
import { TourFare } from 'src/app/shared/models/types/tour-fare.type';
import { TourType } from 'src/app/shared/models/types/tour.type';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';

const APIEndpoint = environment.APIEndpoint;

@Component({
  selector: 'app-my-tours',
  templateUrl: './my-tours.component.html',
  styleUrls: ['./my-tours.component.scss'],
})
export class MyToursComponent implements OnChanges, OnDestroy {
  public routers: typeof routes = routes;

  @Input() tours: Tour[] = [];

  constructor(
    private router: Router,
    private storageService: TokenStorageService // private dtoService: DataTransferService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

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
    this.storageService.saveTour(tour);
    this.router.navigate([this.routers.MY_TOUR_DETAIL]);
  }

  signOut() {
    this.router.navigate([this.routers.WELLCOME]);
  }

  ngOnDestroy(): void {}
}
