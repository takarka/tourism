import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WalletOneDTO } from '../models/wallet-one-dto';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl: string = APIEndpoint + '/api/v1/order/';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  public create(order: any): Observable<WalletOneDTO> {
    return this.http.post<WalletOneDTO>(this.baseUrl, order);
  }

  public goToPaymentForm(url: any, param: any): Observable<any> {
    return this.http.post<any>(url, param);
  }

  public verify(verify: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/verify/', verify);
  }
}
