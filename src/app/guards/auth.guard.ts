import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 'getUser()()' ko hata kar 'user()' karein
  const currentUser = authService.user(); 

  if (currentUser && currentUser.role === 'admin') {
    return true;
  } else {
    // Professional approach: UrlTree return karein navigation ke liye
    return router.createUrlTree(['/login']);
  }
};