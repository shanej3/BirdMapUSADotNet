import { Component, OnInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { BirdsCard } from '../bird-card/bird-card';
import { RecCard } from '../rec-card/rec-card';
import { WeatherCard } from '../weather-card/weather-card';
import { MapMarkersService } from '../../app/services/map/map-markers-service';
import { MapService } from '../../app/services/map-service';
import { UserBirdsService } from '../../app/services/userbirds-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  imports: [BirdsCard, RecCard, WeatherCard],
})
export class MapComponent implements OnInit {
  private mapMarkersService = inject(MapMarkersService);
  protected mapService = inject(MapService);
  protected userBirdsService = inject(UserBirdsService);

  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [39.82, -98.59]; // center of USA
  private readonly DEFAULT_RADIUS = 50; // km

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
  }

  private async onMapClick(e: L.LeafletMouseEvent) {
    const { lat, lng } = e.latlng;

    // Clear previous markers
    this.mapMarkersService.clearAll();

    // Center map and show search radius
    this.centerMap(lat, lng);
    this.mapMarkersService.createCircle(lat, lng, this.DEFAULT_RADIUS, this.map!);

    // Fetch all data
    await this.mapService.fetchLocationData(lat, lng, this.DEFAULT_RADIUS);

    await this.userBirdsService.GetUserBirds("bob-id");  // hard coded user for testing

    // Add recreation area markers
    const recAreas = this.mapService.recAreas();
    for (const area of recAreas) {
      await this.mapMarkersService.addRecAreaMarker(
        area.RecAreaLatitude,
        area.RecAreaLongitude,
        area.RecAreaName,
        area.RecAreaDescription,
        this.map!
      );
    }
  }

  ngOnInit(): void {
    this.initMap();
    this.map?.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
  }

  private centerMap(lat: number, lng: number): void {
    this.centroid = [lat, lng];
    this.map?.setView(this.centroid);
  }
}