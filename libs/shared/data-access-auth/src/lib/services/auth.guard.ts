import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isTokenExpired()) {
      return true;
    }
    this.authService.setRedirectUrl(state.url);
    this.router.navigateByUrl('/login');
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state);
  }

  canLoad(route: Route): boolean {
    const url: string = route.path;
    if (!this.authService.isTokenExpired()) {
      return true;
    }
    this.authService.setRedirectUrl(url);
    this.router.navigateByUrl('/login');
    return false;
  }
}
