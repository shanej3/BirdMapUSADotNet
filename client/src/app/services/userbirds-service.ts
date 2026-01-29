import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

// Service to manage user bird data (favorite, found, want to see)
export class UserBirdsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  userBirds = signal<any[]>([]);

  // retrieve user bird data from backend and updates the userBirds signal
  async GetUserBirds(userId: string) {
    const res = await firstValueFrom(
      this.http.get<any[]>(
        `${this.baseUrl}userbirds/${encodeURIComponent(userId)}`
      )
    );
    this.userBirds.set(res);
  }

  private async performToggle(
    // toggle favorite/want to see/found status for a bird
    userId: string,
    type: 'favorite' | 'found' | 'wantToSee',
    speciesCode: string
  ) {
    const flagKey = type === 'favorite' ? 'isFavorite' : type === 'found' ? 'found' : 'wantToSee';
    const newValue = !this.getFlag(speciesCode, flagKey);

    await firstValueFrom(
      this.http.post(
        `${this.baseUrl}userbirds/${encodeURIComponent(userId)}/${type}/${encodeURIComponent(speciesCode)}?value=${newValue}`,
        {}
      )
    );

    await this.GetUserBirds(userId);
  }

  async toggleFavorite(speciesCode: string, userId: string) {
    return this.performToggle(userId, 'favorite', speciesCode);
  }

  async toggleFound(speciesCode: string, userId: string) {
    return this.performToggle(userId, 'found', speciesCode);
  }

  async toggleWantToSee(speciesCode: string, userId: string) {
    return this.performToggle(userId, 'wantToSee', speciesCode);
  }

  private getUserBird(speciesCode: string) {
    return this.userBirds().find((b) => b.speciesCode === speciesCode);
  }

  private getFlag(speciesCode: string, key: 'isFavorite' | 'found' | 'wantToSee'): boolean {
    const ub = this.getUserBird(speciesCode);
    return ub?.[key] ?? false;
  }

  // return if bird is marked as favorite/found/want to see
  isFavorite(speciesCode: string): boolean {
    return this.getFlag(speciesCode, 'isFavorite');
  }

  found(speciesCode: string): boolean {
    return this.getFlag(speciesCode, 'found');
  }

  wantToSee(speciesCode: string): boolean {
    return this.getFlag(speciesCode, 'wantToSee');
  }
}