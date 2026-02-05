import { Component, input } from '@angular/core';
import { RecArea } from '../../types/api.types';

@Component({
  selector: 'app-rec-card',
  imports: [],
  templateUrl: './rec-card.html',
  styleUrl: './rec-card.css',
})
export class RecCard {
  recAreas = input<RecArea[]>([]);
}
