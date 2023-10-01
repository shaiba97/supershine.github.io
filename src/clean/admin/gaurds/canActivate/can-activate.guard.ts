import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const canActivateGuard: CanActivateFn = (route, state) => {
  return false;
};
