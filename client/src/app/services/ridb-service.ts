import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Service for interacting with the RIDB API
export class RidbService {
  private http = inject(HttpClient);
  async getNearbyRecAreas(lat: number, lng: number, radiusKm: number) {
    const res = this.http.get('http://localhost:5002/api/ridb/NearbyRecAreas', {
      params: {
        lat: String(lat),
        lng: String(lng),
        radiusKm: String(radiusKm)
      }
    });
    return firstValueFrom(res);
  }

}