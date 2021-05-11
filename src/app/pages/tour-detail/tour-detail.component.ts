import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/consts/routes';
import { Tour } from 'src/app/shared/models/tour';
import { TourFare } from 'src/app/shared/models/types/tour-fare.type';
import { TourType } from 'src/app/shared/models/types/tour.type';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';

const APIEndpoint = environment.APIEndpoint;

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss'],
})
export class TourDetailComponent implements OnInit {
  public routers: typeof routes = routes;

  tour!: Tour;

  images: any[] = [];

  // @ViewChild('myCarousel', { static: false}) myCarousel: any;

  constructor(
    private router: Router,
    private storageService: TokenStorageService // private dtoService: DataTransferService
  ) {}
  ngOnInit(): void {
    this.tour = this.storageService.getTour()!;
    this.getImagesUrl();
  }

  getImagesUrl(): void {
    if (this.tour && this.tour.photos && this.tour.photos.length > 0) {
      this.tour.photos.forEach((image) => {
        this.images.push({
          path: APIEndpoint + '/mediafiles/files/' + image.filename,
        });
      });
    }
  }

  getTourFare(): string {
    let tourFare: string = '';
    switch (this.tour.tour_fare) {
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

  getTourType(): string {
    let tourType: string = '';
    switch (this.tour.tour_type) {
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

  goToTourBuyForm(): void {
    this.router.navigate([this.routers.TOUR_BUY_FORM]);
  }

  goBack(): void {
    this.router.navigate([this.routers.TOUR_LIST]);
  }
}
