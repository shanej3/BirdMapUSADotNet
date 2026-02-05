import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-map-nav',
  imports: [],
  templateUrl: './map-nav.html',
  styleUrl: './map-nav.css',
})
export class MapNav {
  protected nearby = signal(true);
  protected toggle(): void {
    this.nearby.update(v => !v);
    console.log("Nearby set to: " + this.nearby());
  }
}
