import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../app/services/account-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
// Component for user login and registration, displayed as modal
export class Login {
  private fb = inject(FormBuilder);  // FormBuilder for creating reactive forms
  accountService = inject(AccountService);
  
  isOpen = signal(false);
  isRegisterMode = signal(false);  // false = login mode, true = registration mode
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  toggleLogin() {
    this.isOpen.set(!this.isOpen());
    this.errorMessage.set(null);
    this.isRegisterMode.set(false);
  }

  toggleMode() {  // Toggle between login and registration mode
    this.isRegisterMode.set(!this.isRegisterMode());
    this.errorMessage.set(null);
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    try {
      const credentials = this.loginForm.value as { userName: string; password: string };
      
      if (this.isRegisterMode()) {  // If in registration mode, call register method, otherwise call login method
        await this.accountService.register(credentials);
      } else {
        await this.accountService.login(credentials);
      }
      
      this.loginForm.reset();
      this.isOpen.set(false);
      this.errorMessage.set(null);
      this.isRegisterMode.set(false);
    } catch (error: any) {
      this.errorMessage.set(error.error || (this.isRegisterMode() ? 'Registration failed' : 'Login failed'));
    }
  }

  onLogout() {
    this.accountService.logout();
  }
}
