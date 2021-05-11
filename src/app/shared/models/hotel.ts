import { HotelType } from "./types/hotel.type";

export class Hotel {
  constructor(
    public id?: number,
    public name?: string,
    public hotel_type?: HotelType,
    public start_number?: number
  ) {}
}
