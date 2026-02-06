import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocationWithRadius } from '../../types/api.types';

@Injectable({
  providedIn: 'root',
}) 

// Service for interacting with the eBird API
export class EbirdService {
  private http = inject(HttpClient);
  // Given lat, lng, and a radius in km, return nearby bird observations
  async getNearbyBirds(location: LocationWithRadius) {
    const res = this.http.get('http://localhost:5002/api/ebird/NearbyObservations', {
      params: {
        lat: String(location.lat),
        lng: String(location.lng),
        radiusKm: String(location.radius)
      }
    });
    return firstValueFrom(res);
  }

  async getNotableBirds(location: LocationWithRadius) {
    const res = this.http.get('http://localhost:5002/api/ebird/NotableObservations', {
      params: {
        lat: String(location.lat),
        lng: String(location.lng),
        radiusKm: String(location.radius)
      }
    });
    return firstValueFrom(res);
  }
}
