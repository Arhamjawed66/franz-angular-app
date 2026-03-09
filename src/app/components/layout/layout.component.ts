import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  // Sidebar state
  isSidebarOpen = true;
  
  // Submenu states for collapsible sections
  isStoreMenuOpen = signal(false);
  isSettingsMenuOpen = signal(false);
  
  // Services
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  
  // Theme signal from ThemeService
  isDarkMode = this.themeService.isDarkMode;
  
  // User from AuthService
  user = this.authService.user;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    // Close submenus when sidebar collapses
    if (!this.isSidebarOpen) {
      this.isStoreMenuOpen.set(false);
      this.isSettingsMenuOpen.set(false);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleStoreMenu() {
    this.isStoreMenuOpen.set(!this.isStoreMenuOpen());
  }

  toggleSettingsMenu() {
    this.isSettingsMenuOpen.set(!this.isSettingsMenuOpen());
  }

  onLogout() {
    this.authService.logout();
  }
}
