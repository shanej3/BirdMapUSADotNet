import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocationWithRadius } from '../../types/api.types';

@Injectable({
  providedIn: 'root',
})

// Service for interacting with the RIDB API
export class RidbService {
  private http = inject(HttpClient);
  async getNearbyRecAreas(location: LocationWithRadius) {
    const res = this.http.get('http://localhost:5002/api/ridb/NearbyRecAreas', {
      params: {
        lat: String(location.lat),
        lng: String(location.lng),
        radiusKm: String(location.radius)
      }
    });
    return firstValueFrom(res);
  }

}