import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MapComponent } from "../features/map/map";

// root component

@Component({
  selector: 'app-root',
  imports: [MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = signal('BirdMapUSA');


  ngOnInit(): void {}
  
}
