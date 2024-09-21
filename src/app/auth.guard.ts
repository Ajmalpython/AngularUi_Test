import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  const token = localStorage.getItem('token');

  if (token === null) {
    
    router.navigate(['/login']);
    return false; 
  }

  return true; // Allow navigation
};
