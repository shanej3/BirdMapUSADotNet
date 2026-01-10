import { inject, Injectable, signal } from '@angular/core';
import { EbirdService } from './ebird-service';
import { RidbService } from './ridb-service';
import { NwsService } from './nws-service';

@Injectable({
  providedIn: 'root',
})

// service for calling all the map-related/location APIs and storing data
export class MapService {
  private ebirdService = inject(EbirdService);
  private ridbService = inject(RidbService);
  private nwsService = inject(NwsService);

  birds = signal<any>([]); 
  recAreas = signal<any>([]);
  locationData = signal<any>(null);  // first NWS API call
  weatherData = signal<any>([]);  // second NWS API call

  async fetchLocationData(lat: number, lng: number, radius: number) {
    const [birdData, recData, weatherData] = await Promise.allSettled([
      this.ebirdService.getNearbyBirds(lat, lng, radius),
      this.ridbService.getNearbyRecAreas(lat, lng, radius),
      this.nwsService.getForecastData(lat, lng),
    ]);

    this.birds.set(birdData.status === 'fulfilled' ? birdData.value : []);
    this.recAreas.set(recData.status === 'fulfilled' ? recData.value : []);
    this.locationData.set(
      weatherData.status === 'fulfilled' ? weatherData.value.locationData : null
    );
    this.weatherData.set(weatherData.status === 'fulfilled' ? weatherData.value.forecastData : []);
  }

  clearData() {
    this.birds.set([]);
    this.recAreas.set([]);
    this.weatherData.set([]);
  }
}
