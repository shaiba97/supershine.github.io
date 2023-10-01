import { CanActivateFn } from '@angular/router';

export const deActivateGuard: CanActivateFn = (route, state) => {
  if (state.url === 'admin/clean-admin-login') {
    return true
  }
  return true;
};
