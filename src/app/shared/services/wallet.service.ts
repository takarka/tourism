import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Wallet } from '../models/wallet';
import { WalletOneDTO } from '../models/wallet-one-dto';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private baseUrl: string = APIEndpoint + '/api/v1/wallet/';

  constructor(private http: HttpClient) {}

  public get(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.baseUrl);
  }

  public addDeposit(
    walletId: number | undefined,
    deposit: any
  ): Observable<WalletOneDTO> {
    return this.http.post<WalletOneDTO>(
      this.baseUrl + walletId + '/deposit/',
      deposit
    );
  }

  public redirectToPaymentWidget(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
