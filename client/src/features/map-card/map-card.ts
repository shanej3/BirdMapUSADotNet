import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-map-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './map-card.html',
  styleUrl: './map-card.css',
})
export class MapCard {
  @Input() birds: any[] = [];
}
