import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// root component

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = signal('BirdMapUSA');

  ngOnInit(): void {
    const params = new HttpParams()
      .set('lat', 34.0522)
      .set('lng', -118.2437)
      .set('radiusKm', 10);
    this.http.get('http://localhost:5002/api/ebird/NearbyObservations', { params }).subscribe({
      next: response => console.log('API Response:', response),
      error: error => console.log(error),
      complete: () => console.log('API call completed')
    })
  }
}
