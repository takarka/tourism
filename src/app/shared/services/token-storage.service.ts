import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PersonData } from '../models/person-data';
import { Tour } from '../models/tour';
import { AuthResponseDTO } from './../models/auth-dto';

const TOKEN_KEY = 'token';
const USER_KEY = 'auth-user';
const PERSON_DATA_KEY = 'person-data';
const SELECTED_TOUR_KEY = 'selected-tour-data';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  authChange = new Subject<boolean>();

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: AuthResponseDTO) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): AuthResponseDTO | null {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY)!);
  }

  public savePersonData(personData: PersonData) {
    window.sessionStorage.removeItem(PERSON_DATA_KEY);
    window.sessionStorage.setItem(PERSON_DATA_KEY, JSON.stringify(personData));
  }

  public getPersonData(): PersonData | null {
    return JSON.parse(window.sessionStorage.getItem(PERSON_DATA_KEY)!);
  }

  public saveTour(tour: Tour) {
    window.sessionStorage.removeItem(SELECTED_TOUR_KEY);
    window.sessionStorage.setItem(SELECTED_TOUR_KEY, JSON.stringify(tour));
  }

  public getTour(): Tour {
    return JSON.parse(window.sessionStorage.getItem(SELECTED_TOUR_KEY)!);
  }

  public isUserAuth(): boolean {
    return this.getToken() !== null;
  }

  private emitAuthenticationChanged() {
    this.authChange.next();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authChange.asObservable();
  }
}
