import { CanActivateFn } from '@angular/router';

export const guestGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
