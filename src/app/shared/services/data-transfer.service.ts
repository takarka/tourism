import { Injectable } from '@angular/core';
import { Tour } from '../models/tour';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  selectedTour!: Tour;

  saveSelectedTour(tour: Tour): void {
    this.selectedTour = tour;
  }

  getSelectedTour(): Tour {
    return this.selectedTour ? this.selectedTour : new Tour();
  }
}
