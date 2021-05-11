import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { AuthDTO } from './../models/auth-dto';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = APIEndpoint + '/api/v1';

  constructor(private http: HttpClient) {}

  public signOut(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/auth/logout/');
  }

  public login(authData: AuthDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/login/', authData);
  }

  public register(authData: AuthDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/register/', authData);
  }

  public restore(authData: AuthDTO): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + '/auth/request_password_reset/',
      authData
    );
  }

  public verify(verify: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/verify/', verify);
  }
}
