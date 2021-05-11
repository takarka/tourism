import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tour } from '../models/tour';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  // Observable string sources
  private emitToggleMenu = new Subject<boolean>();
  // Observable string streams
  menuEmitted$ = this.emitToggleMenu.asObservable();
  // Service message commands
  toggleSideNav(isOpen: boolean) {
    setTimeout(() => {
      this.emitToggleMenu.next(isOpen);
    }, 100);
  }
}
