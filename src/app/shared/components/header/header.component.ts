import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isWhite: boolean = true;
  @Input() menu: boolean = false;
  @Input() stepBack!: string;
  @Input() title: string = '';
  @Input() queryParam: any;

  constructor(private router: Router, private uiService: UIService) {}

  goBack(): void {
    console.log('queryParam: ', this.queryParam);
    if (this.queryParam != null) {
      this.router.navigate([this.stepBack], { queryParams: this.queryParam });
    } else {
      this.router.navigate([this.stepBack]);
    }
  }

  toggleMenu(): void {
    this.uiService.toggleSideNav(true);
  }
}
