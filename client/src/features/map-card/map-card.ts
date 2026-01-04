import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBirdsService } from '../../app/services/userbirds-service';

@Component({
  selector: 'app-map-card',
  imports: [CommonModule],
  templateUrl: './map-card.html',
  styleUrl: './map-card.css',
})
export class BirdsCard {
  @Input() birds: any[] = [];
  
  private userBirdsService = inject(UserBirdsService);

  isFavorite(code: string): boolean {
    return this.userBirdsService.isFavorite(code);
  }
}
