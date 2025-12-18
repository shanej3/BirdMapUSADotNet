import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rec-card',
  imports: [],
  templateUrl: './rec-card.html',
  styleUrl: './rec-card.css',
})
export class RecCard {
  @Input() recAreas: any[] = [];
}
