import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserBirdsService {
  private http = inject(HttpClient);

  userBirds = signal<any[]>([]);

  async loadFavorites(userId: string) {
    const res = await firstValueFrom(
      this.http.get<any[]>(
        `http://localhost:5002/api/userbirds/${encodeURIComponent(userId)}/favorites`
      )
    );
    this.userBirds.set(res);
  }

  isFavorite(speciesCode: string) {
    return this.userBirds().some((b) => b.speciesCode === speciesCode);
  }
}
