import { Component, input } from '@angular/core';
import { WeatherForecast, LocationData } from '../../types/api.types';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})

// Component for displaying weather information
export class WeatherCard {
  weatherData = input<WeatherForecast[]>([]);
  locationData = input<LocationData | null>(null);
}
