import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Initialize theme from localStorage or system preference
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === "dark");
      } else {
        this.isDarkMode.set(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
      
      // Apply initial theme immediately
      this.applyTheme(this.isDarkMode());
    }

    // Effect to update DOM and localStorage when the signal changes
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme(this.isDarkMode());
      }
    });
  }

  private applyTheme(isDark: boolean) {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
  }
}
