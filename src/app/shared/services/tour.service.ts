import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tour } from '../models/tour';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private baseUrl: string = APIEndpoint + '/api/v1/tour/';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl);
  }

  public getById(tour_id: number): Observable<Tour> {
    return this.http.get<Tour>(this.baseUrl + tour_id);
  }
}
