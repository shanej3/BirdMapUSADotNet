import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBirdsService } from '../../app/services/userbirds-service';

@Component({
  selector: 'app-bird-card',
  imports: [CommonModule],
  templateUrl: './bird-card.html',
  styleUrl: './bird-card.css',
})
export class BirdsCard {
  @Input() birds: any[] = [];
  
  private userBirdsService = inject(UserBirdsService);

  isFavorite(code: string): boolean {
    return this.userBirdsService.isFavorite(code);
  }
}
