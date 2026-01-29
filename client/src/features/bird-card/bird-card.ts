import { Component, computed, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBirdsService } from '../../app/services/userbirds-service';
import { MapService } from '../../app/services/map-service';
import { AccountService } from '../../app/services/account-service';

@Component({
  selector: 'app-bird-card',
  imports: [CommonModule],
  templateUrl: './bird-card.html',
  styleUrl: './bird-card.css',
})

// Component for displaying a list of bird findings
// allows user to set a bird as favorite, found, or want to see and filter the list with those flags

export class BirdsCard {
  @Input() set birds(value: any[]) {
    this._birds.set(value);
  }
  @Input() lastLocation: { lat: number; lng: number; radius: number } | null = null;
  
  private _birds = signal<any[]>([]);
  private userBirdsService = inject(UserBirdsService);
  protected mapService = inject(MapService);
  protected accountService = inject(AccountService);

  // Filter toggles
  showOnlyFavorites = signal(false);
  showOnlyFound = signal(false);
  showOnlyWantToSee = signal(false);
  hideFound = signal(false);

  // Filtered list of birds to display
  displayBirds = computed(() => {
    return this._birds().filter(b => {
      if (this.showOnlyFavorites() && !b.isFavorite) return false;
      if (this.showOnlyFound() && !b.found) return false;
      if (this.showOnlyWantToSee() && !b.wantToSee) return false;
      if (this.hideFound() && b.found) return false;
      return true;
    });
  });

  toggleFilter(filter: 'favorites' | 'found' | 'wantToSee' | 'hideFound') {
    const filters = {
      favorites: this.showOnlyFavorites,
      found: this.showOnlyFound,
      wantToSee: this.showOnlyWantToSee,
      hideFound: this.hideFound
    };
    filters[filter].update(v => !v);  // toggle selected filter (flip the boolean value)
  }

  async toggleObservationType() {
    if (!this.lastLocation) return;
    
    this.mapService.toggleObservationType();
    await this.mapService.fetchBirdsOnly(
      this.lastLocation.lat,
      this.lastLocation.lng,
      this.lastLocation.radius
    );
  }

  async toggleFavorite(code: string) {
    await this.userBirdsService.toggleFavorite(code, this.accountService.currentUser()?.id || '');
  }

  async toggleFound(code: string) {
    await this.userBirdsService.toggleFound(code, this.accountService.currentUser()?.id || '');
  }

  async toggleWantToSee(code: string) {
    await this.userBirdsService.toggleWantToSee(code, this.accountService.currentUser()?.id || '');
  }

  
  isFavorite(bird: any): boolean {
    return bird.isFavorite ?? false;
  }

  found(bird: any): boolean {
    return bird.found ?? false;
  }

  wantToSee(bird: any): boolean {
    return bird.wantToSee ?? false;
  }
}
