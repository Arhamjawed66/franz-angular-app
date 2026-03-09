import { Injectable, signal, inject } from '@angular/core'; // inject add kiya
import { Router } from '@angular/router'; // Router import kiya

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSignal = signal<any>(null);
  public user = this.userSignal.asReadonly();
  
  // Router inject karein
  private router = inject(Router);

  constructor() {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.userSignal.set(JSON.parse(storedUser));
      }
    }
  }

  login(userData: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(userData));
      this.userSignal.set(userData);
      this.router.navigate(['/dashboard']); // Login ke baad dashboard bhejien
    }
  }

  register(userData: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(userData));
      this.userSignal.set(userData);
      this.router.navigate(['/login']); // Register ke baad login page bhejien
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      // 1. Storage saaf karein
      localStorage.removeItem("user");

      // 2. Signal ko null karein
      this.userSignal.set(null);

      // 3. Navigation trigger karein (Sabse zaroori step)
      this.router.navigate(['/login']).then(() => {
        // Optional: Page refresh agar state clean karni ho puri tarah
        // window.location.reload();
      });
    }
  }
}