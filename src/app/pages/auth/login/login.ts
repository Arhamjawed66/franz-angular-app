import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);

  username = '';
  password = '';
  role = '';
  error = '';
  showPassword = false;
  showPopup = false;
  popupMessage = '';

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faExclamationTriangle = faExclamationTriangle;

  sanitizeInput(value: string): string {
    return value.replace(/<[^>]*>?/gm, "").replace(/[^\w\s@.-]/gi, "").trim();
  }

  onRoleChange() {
    this.username = this.role + '@123';
    this.password = '1234567';
  }

  handleSubmit() {
    const cleanUsername = this.sanitizeInput(this.username);
    const cleanPassword = this.sanitizeInput(this.password);

    if (cleanUsername === this.role + '@123' && cleanPassword === '1234567') {
      const userData = { role: this.role, name: this.role.charAt(0).toUpperCase() + this.role.slice(1) };
      this.authService.login(userData);
      this.router.navigate(['/dashboard']);
    } else {
      this.showPopup = true;
      this.popupMessage = 'this user are invalid for more information contact us (grow@franzsns.com)';
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
