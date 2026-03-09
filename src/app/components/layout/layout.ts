import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes, faHome, faStore, faTruck, faBox, faChevronDown, faChevronRight, faListAlt, faCartPlus, faCreditCard, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { NavbarComponent } from '../navbar/navbar';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, NavbarComponent],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {
  themeService = inject(ThemeService);

  isSidebarOpen = signal(true);
  openDropdown = signal<string | null>(null);

  faBars = faBars;
  faTimes = faTimes;
  faHome = faHome;
  faStore = faStore;
  faTruck = faTruck;
  faBox = faBox;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faListAlt = faListAlt;
  faCartPlus = faCartPlus;
  faCreditCard = faCreditCard;
  faHeadset = faHeadset;

  toggleDropdown(menu: string) {
    this.openDropdown.set(this.openDropdown() === menu ? null : menu);
  }

  handleLinkClick() {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      this.isSidebarOpen.set(false);
    }
  }
}