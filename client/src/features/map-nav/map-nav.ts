import { Component } from '@angular/core';

@Component({
  selector: 'app-map-nav',
  imports: [],
  templateUrl: './map-nav.html',
  styleUrl: './map-nav.css',
})
export class MapNav {
  protected nearby = true;
  protected toggle(): void {
    this.nearby = !this.nearby;
    console.log("Nearby set to: " + this.nearby);
  }
}
