import { JsonPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "../features/map/map";
import { Navbar } from "../features/navbar/navbar";

// root component

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, MapComponent, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = signal('BirdMapUSA');


  ngOnInit(): void {}
  
}
