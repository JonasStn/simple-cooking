import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME = 'jwt_token';

interface Token {
  thirdPartyId: string;
  provider: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  private redirectUrl: string;

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<Token>(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenUserId(): string | undefined {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) return undefined;

    const decoded = jwt_decode<Token>(token);
    return decoded.thirdPartyId;
  }
}
