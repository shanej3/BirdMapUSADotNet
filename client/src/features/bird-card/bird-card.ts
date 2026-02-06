import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBirdsService } from '../../app/services/userbirds-service';
import { MapService } from '../../app/services/map-service';
import { AccountService } from '../../app/services/account-service';
import { BirdObservation, LocationWithRadius } from '../../types/api.types';

@Component({
  selector: 'app-bird-card',
  imports: [CommonModule],
  templateUrl: './bird-card.html',
  styleUrl: './bird-card.css',
})

// Component for displaying a list of bird findings
// allows user to set a bird as favorite, found, or want to see and filter the list with those flags

export class BirdsCard {
  birds = input<BirdObservation[]>([]);
  lastLocation = input<LocationWithRadius | null>(null);
  
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
    const filtered = this.birds().filter(b => {
      if (this.showOnlyFavorites() && !b.isFavorite) return false;
      if (this.showOnlyFound() && !b.found) return false;
      if (this.showOnlyWantToSee() && !b.wantToSee) return false;
      if (this.hideFound() && b.found) return false;
      return true;
    });
    
    // Remove duplicates, since ebird API often returns duplicates for notable observations
    const seen = new Set();
    return filtered.filter(bird => {
      if (seen.has(bird.speciesCode)) return false;
      seen.add(bird.speciesCode);
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

  onRadiusDrag(event: Event) {
    if (!this.lastLocation()) return;
    
    const input = event.target as HTMLInputElement;
    const newRadiusKm = parseInt(input.value);
    
    this.mapService.radiusKm.set(newRadiusKm);
    this.lastLocation()!.radius = newRadiusKm;
    
    // Notify map component to update circle
    if (this.mapService.onRadiusChange) {
      this.mapService.onRadiusChange();
    }
  }

  onRadiusRelease(event: Event) {
    this.refetchWithNewRadius();
  }

  private async refetchWithNewRadius() {
    if (!this.lastLocation()) return;
    
    const radius = this.mapService.radiusKm();
    
    // Refetch data with new radius
    await this.mapService.fetchLocationData({
      lat: this.lastLocation()!.lat,
      lng: this.lastLocation()!.lng,
      radius
    });
  }

  async toggleObservationType() {
    if (!this.lastLocation()) return;
    
    this.mapService.toggleObservationType();
    await this.mapService.fetchBirdsOnly(this.lastLocation()!);
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

  
  isFavorite(bird: BirdObservation): boolean {
    return bird.isFavorite ?? false;
  }

  found(bird: BirdObservation): boolean {
    return bird.found ?? false;
  }

  wantToSee(bird: BirdObservation): boolean {
    return bird.wantToSee ?? false;
  }
}
