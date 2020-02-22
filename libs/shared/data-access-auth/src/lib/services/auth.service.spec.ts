import { TestBed } from '@angular/core/testing';

import { AuthService, TOKEN_NAME } from './auth.service';

jest.mock('jwt-decode', () =>
  jest.fn(() => ({ exp: 3600, thirdPartyId: '123' }))
);

describe('AuthService', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'token'),
        setItem: jest.fn(() => {})
      },
      writable: true
    });

    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('should setRedirectUrl', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setRedirectUrl('redirect');
    const url = service.getRedirectUrl();
    expect(url).toBe('redirect');
  });

  it('should get token from local storage', () => {
    const service: AuthService = TestBed.inject(AuthService);
    const token = service.getToken();
    expect(token).toBe('token');
    expect(window.localStorage.getItem).toHaveBeenCalledWith(TOKEN_NAME);
  });

  it('should set token to localstorage', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setToken('token');
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      TOKEN_NAME,
      'token'
    );
  });

  it('should get expiration date', () => {
    const service: AuthService = TestBed.inject(AuthService);
    const expirationDate = service.getTokenExpirationDate('token');
    const date = new Date(0);
    date.setUTCSeconds(3600);
    expect(expirationDate).toEqual(date);
  });

  it('should get user id', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.isTokenExpired = jest.fn(() => false);
    const userId = service.getTokenUserId();
    expect(userId).toBe('123');
  });

  describe('isTokenExpired', () => {
    it('should return true on expired token', () => {
      const service: AuthService = TestBed.inject(AuthService);
      // create date from yesterday
      const date = new Date();
      date.setDate(date.getDate() - 1);
      service.getTokenExpirationDate = jest.fn(() => date);
      const shouldBeExpired = service.isTokenExpired('token');
      expect(shouldBeExpired).toBe(true);
    });
    it('should return false on non expired token', () => {
      const service: AuthService = TestBed.inject(AuthService);
      // create date from tomorrow
      const date = new Date();
      date.setDate(date.getDate() + 1);
      service.getTokenExpirationDate = jest.fn(() => date);
      const shouldBeExpired = service.isTokenExpired('token');
      expect(shouldBeExpired).toBe(false);
    });
  });
});
