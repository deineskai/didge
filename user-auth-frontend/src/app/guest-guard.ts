import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from './auth';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Allow the route to load if we're on the server
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // If the user is logged in, redirect them to profile
  if (auth.isLoggedIn()) {
    router.navigate(['/profile']);
    return false; // Block access to the Login/Register page
  }

  return true; // Allow access if they are a guest
};