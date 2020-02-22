import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createSpyObject, SpyObject } from '@ngneat/spectator';

import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { AuthService } from './auth.service';

describe('AuthHeaderInterceptor', () => {
  let authService: SpyObject<AuthService>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthHeaderInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHeaderInterceptor,
          multi: true
        },
        { provide: AuthService, useValue: createSpyObject(AuthService) }
      ]
    });
    authService = TestBed.inject(AuthService) as SpyObject<AuthService>;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const interceptor: AuthHeaderInterceptor = TestBed.inject(
      AuthHeaderInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const userId = '123';
    const url = `api/auth/user/${userId}`;
    httpClient.get(url).subscribe();
    const httpRequest = httpMock.expectOne(url);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });
});
