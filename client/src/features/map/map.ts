import { Component, OnInit, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { EbirdService } from '../../app/services/ebird-service';
import { BirdsCard } from '../map-card/map-card';
import { RidbService } from '../../app/services/ridb-service';
import { RecCard } from '../rec-card/rec-card';
import { NwsService } from '../../app/services/nws-service';
import { WeatherCard } from '../weather-card/weather-card';

// todo: probably move map logic to a service

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  imports: [BirdsCard, RecCard, WeatherCard],
})
export class MapComponent implements OnInit {
  private ebirdService = inject(EbirdService);
  private ridbService = inject(RidbService);
  protected nws = inject(NwsService);

  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [39.82, -98.59]; // center of usa
  protected circle = L.circle([0, 0], { radius: 0 }); // circle to show radius; one instance

  protected birds = signal<any>([]);

  protected recAreas = signal<any>([]);
  protected rec_area: any;

  protected weatherData = signal<any>([]);
  

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 5,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.addTo(this.map);
    this.circle.addTo(this.map);
  }
  private async onMapClick(e: L.LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    const radius = 50;

    try {
      const data = await this.ebirdService.getNearbyBirds(lat, lng, radius);
      this.birds.set(data); // ensure always an array
    } catch (error) {
      console.error('Error fetching birds:', error);
      this.birds.set([]); // Set empty array on error
    }

    this.centerMap(lat, lng);
    this.createCircle(lat, lng, radius); // move the circle marker to new location

    const rec_data = (await this.ridbService.getNearbyRecAreas(lat, lng, radius)) as any[];
    console.log(rec_data);
    for (this.rec_area of rec_data) {
      var marker = L.marker([this.rec_area.RecAreaLatitude, this.rec_area.RecAreaLongitude])
        .bindPopup(
          `<aref> <b>${this.rec_area.RecAreaName}</b><br>${this.rec_area.RecAreaDescription}`,
          { maxHeight: 300 }
        )
        .addTo(this.map!);
    }

    try {
      const weatherData = await this.nws.getForecastData(lat, lng);
      this.weatherData.set(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.weatherData.set([]); // Set empty array on error
    }
    
  }

  constructor() {}

  ngOnInit(): void {
    // map creation and events go here
    this.initMap();
    this.map?.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
  }

  centerMap(lat: number, lng: number) {
    this.centroid = [lat, lng];
    this.map?.setView(this.centroid);
  }

  createCircle(lat: number, lng: number, radius: number) {
    if (!this.map?.hasLayer(this.circle)) {
      this.circle.addTo(this.map!);
    }
    this.circle
      .setLatLng([lat, lng])
      .setRadius(radius * 1000)
      .setStyle({
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        opacity: 0.25,
      });
  }
}
