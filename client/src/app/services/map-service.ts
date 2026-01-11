import { computed, inject, Injectable, signal } from '@angular/core';
import { EbirdService } from './ebird-service';
import { RidbService } from './ridb-service';
import { NwsService } from './nws-service';
import { UserBirdsService } from './userbirds-service';

@Injectable({
  providedIn: 'root',
})

// service for calling all the map-related/location APIs and storing data
export class MapService {
  private ebirdService = inject(EbirdService);
  private ridbService = inject(RidbService);
  private nwsService = inject(NwsService);
  private userBirdsService = inject(UserBirdsService);

  birds = signal<any>([]); 
  recAreas = signal<any>([]);
  locationData = signal<any>(null);  // first NWS API call
  weatherData = signal<any>([]);  // second NWS API call

  // combine 'userBirds' (birds flagged by user) and 'birds' (birds from Ebird API)
  combinedBirds = computed(() => {
    const birds = this.birds();
    const userBirds = this.userBirdsService.userBirds();
    
    return birds.map((bird: any) => {
      const userBird = userBirds.find(ub => ub.speciesCode === bird.speciesCode);
      return {
        ...bird,
        isFavorite: userBird?.isFavorite ?? false,
        found: userBird?.found ?? false,
        wantToSee: userBird?.wantToSee ?? false,
      };
    });
  });

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
