import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy, OnInit, inject, signal, Input } from '@angular/core';
import * as L from 'leaflet';
import { MapNav } from "../map-nav/map-nav";

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  imports: [MapNav],
})
export class MapComponent implements OnInit {
  private http = inject(HttpClient);

  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [39.82, -98.59]; // center of usa

  @Input() nearby = true;

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
  }

  private onMapClick(e: L.LeafletMouseEvent) {
    const {lat, lng} = e.latlng;
    const params = new HttpParams()
      .set('lat', String(lat))
      .set('lng', String(lng))
      .set('radiusKm', 50); // 50 is max
    if (this.nearby == true) {
      this.http.get('http://localhost:5002/api/ebird/NearbyObservations', { params }).subscribe({
      next: response => { this.birds.set(response); console.log(response); },
      error: error => console.log(error),
      complete: () => console.log('API call completed')
    });
    } else {
      this.http.get('http://localhost:5002/api/ebird/NotableObservations', { params }).subscribe({
      next: response => { this.birds.set(response); console.log(response); },
      error: error => console.log(error),
      complete: () => console.log('API call completed')
    })
    }
    
  }

  

  constructor() { }

  ngOnInit(): void {
    // map creation and events go here
    this.initMap();
    this.map?.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
  }
}