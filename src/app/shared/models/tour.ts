import { Service } from './service';
import { Flight } from "./flight";
import { Hotel } from "./hotel";
import { PhotoFile } from "./photo-file";
import { TourFare } from "./types/tour-fare.type";
import { TourType } from "./types/tour.type";

export class Tour {
  constructor(
    public id?: number,
    public tour_type?: TourType,
    public tour_fare?: TourFare,
    public from_date?: Date,
    public to_date?: Date,
    public price?: number,
    public hotel_madina?: Hotel,
    public hotel_mekka?: Hotel,
    public departure?: Flight,
    public arrival?: Flight,
    public to_kaaba?: number,
    public photos?: PhotoFile[],
    public services?: Service[],
  ) {}
}
