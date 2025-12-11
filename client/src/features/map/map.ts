import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy, OnInit, inject, signal, Input } from '@angular/core';
import * as L from 'leaflet';
import { MapNav } from "../map-nav/map-nav";
import { EbirdService } from '../../app/services/ebird-service';
import { MapCard } from "../map-card/map-card";

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  imports: [ MapCard],
})
export class MapComponent implements OnInit {

  private http = inject(HttpClient);
  private ebirdService = inject(EbirdService);

  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [39.82, -98.59]; // center of usa
  protected circle = L.circle([0,0], {radius : 0});



  protected birds = signal<any>([]);

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.circle.addTo(this.map);

    
  }

  private async onMapClick(e: L.LeafletMouseEvent) {
    const {lat, lng} = e.latlng;
    const radius = 50;
      const data = await this.ebirdService.getNearbyBirds(lat, lng, radius);
      this.birds.set(data);
      this.centerMap(lat, lng);
      this.createMarker(lat, lng, radius)
    }

    constructor() { }

  ngOnInit(): void {
    // map creation and events go here
    this.initMap();
    this.map?.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
  }

  centerMap(lat: number, lng: number) {
    this.centroid = [lat, lng];
    this.map?.setView(this.centroid);
  }

  createMarker(lat: number, lng: number, radius: number) { 
    if (!this.map?.hasLayer(this.circle)) {
      this.circle.addTo(this.map!);
    }
    this.circle.setLatLng([lat, lng])
    .setRadius(radius * 1000)
    .setStyle({
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.1,
      opacity: 0.25
    });

    
  }

}



  
