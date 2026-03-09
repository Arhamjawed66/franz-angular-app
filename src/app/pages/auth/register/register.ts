import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  error = '';

  sanitizeInput(value: string): string {
    return value.replace(/[<>]/g, "").replace(/\s{2,}/g, " ").trim();
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target && target.id in this.formData) {
      const { id, value } = target;
      this.formData[id as keyof typeof this.formData] = this.sanitizeInput(value);
    }
  }

  handleSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (!this.formData.name || !this.formData.email || !this.formData.password) {
      this.error = 'All fields are required';
      return;
    }

    const userData = {
      name: this.formData.name,
      email: this.formData.email,
      role: 'user' // Default role for new users
    };

    this.authService.register(userData);
  }
}