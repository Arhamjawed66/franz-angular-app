import { Component, Output, EventEmitter, inject, signal, effect, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faSearch, faShoppingCart, faUser, faSun, faMoon, faSignOutAlt, faEllipsisVertical, faTimes, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  themeService = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);
  el = inject(ElementRef); // Navbar element ka reference

  accountOpen = signal(false); // Initial state hamesha false hogi
  mobileMenuOpen = signal(false); // Mobile menu state
  user: any = null;

  faBars = faBars;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faSun = faSun;
  faMoon = faMoon;
  faSignOutAlt = faSignOutAlt;
  faEllipsisVertical = faEllipsisVertical;
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  constructor() {
    effect(() => {
      this.user = this.authService.user();
    });
  }

  // Dropdown ko toggle karne ke liye
  toggleAccount(event: Event) {
    event.stopPropagation(); // Click event ko bahar jane se rokta hai
    this.accountOpen.update(val => !val);
    // Close mobile menu when clicking account
    this.mobileMenuOpen.set(false);
  }

  // Mobile menu toggle
  toggleMobileMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.mobileMenuOpen.update(val => !val);
    // Close account dropdown when opening mobile menu
    if (this.mobileMenuOpen()) {
      this.accountOpen.set(false);
    }
  }

  // Agar user kahin bhi bahar click kare toh dropdown band ho jaye
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.accountOpen.set(false);
      this.mobileMenuOpen.set(false);
    }
  }

  logout() {
    this.accountOpen.set(false);
    this.mobileMenuOpen.set(false);
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Hover support (optional agar aap chahte hain)
  onAccountHoverEnter() {
    this.accountOpen.set(true);
  }

  onAccountHoverLeave() {
    this.accountOpen.set(false);
  }
}
