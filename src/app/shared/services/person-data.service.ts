import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PersonData } from '../models/person-data';
import { TokenStorageService } from './token-storage.service';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class PersonDataService {
  private baseUrl: string = APIEndpoint + '/api/v1/personal-data/';

  constructor(private http: HttpClient) {}

  public saveData(userId: any, personData: PersonData): Observable<any> {
    return this.http.patch<any>(this.baseUrl + userId + '/', personData);
  }

  public getById(id: number | undefined): Observable<PersonData> {
    return this.http.get<PersonData>(this.baseUrl + id + '/');
  }
}
