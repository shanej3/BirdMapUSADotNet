import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Service for interacting with the NWS API
// Getlocationdata is first call to the API
// then NWS gives us a link to forecast data (2nd call)
export class NwsService {
  private http = inject(HttpClient);
  
  async getLocationData(lat: number, lng: number) {
    const res = this.http.get('http://localhost:5002/api/nws/InitialData', {
      params: {
        lat: String(lat),
        lng: String(lng)
      }
    });
    return firstValueFrom(res);
  }

  async getForecastData(lat: number, lng: number) {
    try {
      const locationData = await this.getLocationData(lat, lng) as any;
      const res = this.http.get('http://localhost:5002/api/nws/ForecastData', {
        params: {
          forecastUrl: locationData['properties']['forecast']
        }
      });
      return { locationData, forecastData: await firstValueFrom(res) };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}