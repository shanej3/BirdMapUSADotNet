import { JsonPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// root component

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = signal('BirdMapUSA');
  protected birds = signal<any>([]);

  ngOnInit(): void {
    const params = new HttpParams()
      .set('lat', '34.0522')
      .set('lng', '-118.2437')
      .set('radiusKm', '10');
    this.http.get('http://localhost:5002/api/ebird/NearbyObservations', { params }).subscribe({
      next: response => this.birds.set(response),
      error: error => console.log(error),
      complete: () => console.log('API call completed')
    })
  }
  
}
