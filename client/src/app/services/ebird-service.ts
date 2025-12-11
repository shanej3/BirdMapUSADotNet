import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EbirdService {
  private http = inject(HttpClient);
  async getNearbyBirds(lat: number, lng: number, radiusKm: number) {
    const res = this.http.get('http://localhost:5002/api/ebird/NearbyObservations', {
      params: {
        lat: String(lat),
        lng: String(lng),
        radiusKm: String(radiusKm)
      }
    });
    return firstValueFrom(res);
  }

  async getNotableBirds(lat: number, lng: number, radiusKm: number) {
    const res = this.http.get('http://localhost:5002/api/ebird/NotableObservations', {
      params: {
        lat: String(lat),
        lng: String(lng),
        radiusKm: String(radiusKm)
      }
    });
    return firstValueFrom(res);
  }
}
