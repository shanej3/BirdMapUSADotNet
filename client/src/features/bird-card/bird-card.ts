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

  async toggleFavorite(code: string) {
    await this.userBirdsService.toggleFavorite(code, "bob-id");
  }

  async toggleFound(code: string) {
    await this.userBirdsService.toggleFound(code, "bob-id");
  }

  async toggleWantToSee(code: string) {
    await this.userBirdsService.toggleWantToSee(code, "bob-id");
  }

  isFavorite(code: string): boolean {
    return this.userBirdsService.isFavorite(code);
  }

  found(code: string): boolean {
    return this.userBirdsService.found(code);
  }

  wantToSee(code: string): boolean {
    return this.userBirdsService.wantToSee(code);
  }
}
