import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-card',
  imports: [CommonModule],
  templateUrl: './map-card.html',
  styleUrl: './map-card.css',
})
export class BirdsCard {
  @Input() birds: any[] = [];
}
