import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})

// Component for displaying weather information
export class WeatherCard {
  @Input() weatherData: any[] = [];
  @Input() locationData: any = null;
}
