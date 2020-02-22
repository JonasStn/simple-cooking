import { inject, TestBed } from '@angular/core/testing';
import { Route, Router, RouterStateSnapshot } from '@angular/router';
import { createSpyObject, SpyObject } from '@ngneat/spectator/jest';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

let router: SpyObject<Router>;
let authService: SpyObject<AuthService>;

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: createSpyObject(AuthService)
        },
        { provide: Router, useValue: createSpyObject(Router) }
      ]
    });
    authService = TestBed.inject(AuthService) as SpyObject<AuthService>;
    router = TestBed.inject(Router) as SpyObject<Router>;
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should return true when token is set', inject(
      [AuthGuard],
      (guard: AuthGuard) => {
        authService.isTokenExpired.mockReturnValue(false);
        const result = guard.canActivate(null, {
          url: 'redirect/url'
        } as RouterStateSnapshot);
        expect(result).toBe(true);
      }
    ));
    it('should return false when token is expired', inject(
      [AuthGuard],
      (guard: AuthGuard) => {
        authService.isTokenExpired.mockReturnValue(true);
        const result = guard.canActivate(null, {
          url: 'redirect/url'
        } as RouterStateSnapshot);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
        expect(authService.setRedirectUrl).toHaveBeenCalledWith('redirect/url');
        expect(result).toBe(false);
      }
    ));
  });

  describe('canActivateChild', () => {
    it('should return delegate to canActivate', inject(
      [AuthGuard],
      (guard: AuthGuard) => {
        guard.canActivate = jest.fn(() => true);
        authService.isTokenExpired.mockReturnValue(false);
        const result = guard.canActivateChild(null, {
          url: 'redirect/url'
        } as RouterStateSnapshot);
        expect(result).toBe(true);
        expect(guard.canActivate).toHaveBeenCalledWith(null, {
          url: 'redirect/url'
        });
      }
    ));
  });

  describe('canLoad', () => {
    it('should return true when token is set', inject(
      [AuthGuard],
      (guard: AuthGuard) => {
        authService.isTokenExpired.mockReturnValue(false);
        const result = guard.canLoad({
          path: 'redirect/url'
        } as Route);
        expect(result).toBe(true);
      }
    ));
    it('should return false when token is expired', inject(
      [AuthGuard],
      (guard: AuthGuard) => {
        authService.isTokenExpired.mockReturnValue(true);
        const result = guard.canLoad({
          path: 'redirect/url'
        } as Route);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
        expect(authService.setRedirectUrl).toHaveBeenCalledWith('redirect/url');
        expect(result).toBe(false);
      }
    ));
  });
});
