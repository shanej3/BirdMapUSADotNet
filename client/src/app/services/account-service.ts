import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserDto, LoginDto, RegisterDto } from '../../types/account.types';

@Injectable({
  providedIn: 'root',
})

// service for handling user authentication and storing current user data (keeping them logged in across refreshes)
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  currentUser = signal<UserDto | null>(null);

  async login(loginDto: LoginDto) {
    const user = await firstValueFrom(
      this.http.post<UserDto>(`${this.baseUrl}account/login`, loginDto)
    );
    this.setCurrentUser(user);
    return user;
  }

  async register(registerDto: RegisterDto) {
    const user = await firstValueFrom(
      this.http.post<UserDto>(`${this.baseUrl}account/register`, registerDto)
    );
    this.setCurrentUser(user);
    return user;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  private setCurrentUser(user: UserDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  // load user from local storage 
  loadUserFromStorage() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.currentUser.set(user);
    }
  }
}
