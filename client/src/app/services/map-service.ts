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
  observationType = signal<'recent' | 'notable'>('recent');  // track which type of observations to fetch
  radiusKm = signal<number>(50);  // search radius in kilometers (might convert to miles eventually)
  
  // Event handler for radius changing (updating circle)
  onRadiusChange: (() => void) | null = null;

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

  // Fetch all location data (birds, weather, recreation areas)
  async fetchLocationData(lat: number, lng: number, radius: number) {
    const [birdData, recData, weatherData] = await Promise.allSettled([
      this.observationType() === 'recent' 
        ? this.ebirdService.getNearbyBirds(lat, lng, radius)
        : this.ebirdService.getNotableBirds(lat, lng, radius),
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

  // Fetch only bird data (for switching between recent/notable observations)
  async fetchBirdsOnly(lat: number, lng: number, radius: number) {
    try {
      const birdData = this.observationType() === 'recent'
        ? await this.ebirdService.getNearbyBirds(lat, lng, radius)
        : await this.ebirdService.getNotableBirds(lat, lng, radius);
      
      this.birds.set(birdData);
    } catch (error) {
      console.error('Error fetching birds:', error);
      this.birds.set([]);
    }
  }

  // Toggle between recent and notable observations
  toggleObservationType() {
    this.observationType.update(type => type === 'recent' ? 'notable' : 'recent');
  }

  clearData() {
    this.birds.set([]);
    this.recAreas.set([]);
    this.weatherData.set([]);
  }
}
