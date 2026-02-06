import { computed, inject, Injectable, signal } from '@angular/core';
import { EbirdService } from './ebird-service';
import { RidbService } from './ridb-service';
import { NwsService } from './nws-service';
import { UserBirdsService } from './userbirds-service';
import { BirdObservation, RecArea, WeatherForecast, LocationData, LocationWithRadius } from '../../types/api.types';

@Injectable({
  providedIn: 'root',
})

// service for calling all the map-related/location APIs and storing data
export class MapService {
  private ebirdService = inject(EbirdService);
  private ridbService = inject(RidbService);
  private nwsService = inject(NwsService);
  private userBirdsService = inject(UserBirdsService);

  birds = signal<BirdObservation[]>([]); 
  recAreas = signal<RecArea[]>([]);
  locationData = signal<LocationData | null>(null);  // first NWS API call, can be null if call fails
  weatherData = signal<WeatherForecast[]>([]);  // second NWS API call
  observationType = signal<'recent' | 'notable'>('recent');  // track which type of observations to fetch
  radiusKm = signal<number>(50);  // search radius in kilometers (might convert to miles eventually)
  
  // Event handler for radius changing (updating circle)
  onRadiusChange: (() => void) | null = null;

  // combine 'userBirds' (birds flagged by user) and 'birds' (birds from Ebird API)
  combinedBirds = computed(() => {
    const birds = this.birds();
    const userBirds = this.userBirdsService.userBirds();
    
    return birds.map((bird) => {
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
  async fetchLocationData(location: LocationWithRadius) {
    const [birdData, recData, weatherData] = await Promise.allSettled([
      this.observationType() === 'recent' 
        ? this.ebirdService.getNearbyBirds(location)
        : this.ebirdService.getNotableBirds(location),
      this.ridbService.getNearbyRecAreas(location),
      this.nwsService.getForecastData(location.lat, location.lng),
    ]);

    this.birds.set(birdData.status === 'fulfilled' ? birdData.value as BirdObservation[] : []);
    this.recAreas.set(recData.status === 'fulfilled' ? recData.value as RecArea[] : []);
    this.locationData.set(
      weatherData.status === 'fulfilled' ? weatherData.value.locationData as LocationData : null
    );
    this.weatherData.set(weatherData.status === 'fulfilled' ? weatherData.value.forecastData as WeatherForecast[] : []);
  }

  // Fetch only bird data (for switching between recent/notable observations)
  async fetchBirdsOnly(location: LocationWithRadius) {
    try {
      const birdData = this.observationType() === 'recent'
        ? await this.ebirdService.getNearbyBirds(location)
        : await this.ebirdService.getNotableBirds(location);
      
      this.birds.set(birdData as BirdObservation[]);
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
