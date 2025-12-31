import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

// service to manage map markers/overlays, such as the radius circle and recareas

export class MapMarkersService {
  private recAreaMarkers: L.Marker[] = [];
  private searchCircle: L.Circle | null = null;

  createCircle(lat: number, lng: number, radius: number, map: L.Map): void {
    if (this.searchCircle) {
      this.searchCircle.remove();
    }

    this.searchCircle = L.circle([lat, lng], {
      radius: radius * 1000, // convert km to meters
      color: '#3388ff',
      fillColor: '#3388ff',
      fillOpacity: 0.1,
    }).addTo(map);
  }

  async addRecAreaMarker(
    lat: number,
    lng: number,
    name: string,
    description: string,
    map: L.Map
  ): Promise<L.Marker> {
    const marker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<b>${name}</b><br><div style="max-height: 300px; overflow-y: auto;">${description}</div>`, {
      maxWidth: 300
      });

    this.recAreaMarkers.push(marker);
    return marker;
  }

  clearRecAreaMarkers(): void {
    this.recAreaMarkers.forEach(marker => marker.remove());
    this.recAreaMarkers = [];
  }

  clearSearchCircle(): void {
    if (this.searchCircle) {
      this.searchCircle.remove();
      this.searchCircle = null;
    }
  }

  clearAll(): void {
    this.clearRecAreaMarkers();
    this.clearSearchCircle();
  }
}