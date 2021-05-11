import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Component, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UIService } from './shared/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isOpen: boolean = false;

  toggleMenuSub: Subscription;

  constructor(
    private storageService: TokenStorageService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private uiService: UIService,
    private donSanitizer: DomSanitizer
  ) {
    this.toggleMenuSub = this.uiService.menuEmitted$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });

    this.matIconRegistry.addSvgIcon(
      'svg_hostel',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/hostel.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_kaaba',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/kaaba.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_eat',
      this.donSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/eat.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'svg_aircraft',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/aircraft.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_success',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/loading_sucess.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_person',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/person.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_phone',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/phone.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_mail',
      this.donSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/mail.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'svg_wallet',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/wallet.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_coins',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/coins.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'svg_dot',
      this.donSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/dot.svg'
      )
    );
  }

  backdropClicked(): void {
    this.isOpen = false;
  }

  logout() {
    this.storageService.signOut();
    this.isOpen = false;
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.toggleMenuSub) {
      this.toggleMenuSub.unsubscribe();
    }
  }
}
