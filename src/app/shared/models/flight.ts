import { Aircraft } from "./aircraft";

export class Flight {
  constructor(
    public id?: number,
    public aircraft?: Aircraft,
    public departure_date?: Date,
    public arrival_date?: Date,
    public from_flight?: string,
    public to_flight?: string
  ) {}
}
