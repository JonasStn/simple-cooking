import { HttpClient } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createSpyObject, SpyObject } from '@ngneat/spectator/jest';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { routerNavigatedAction } from '@ngrx/router-store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';
import { cold, Scheduler } from 'jest-marbles';
import { Observable } from 'rxjs';

import { AuthService } from '../../services';
import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let authService: SpyObject<AuthService>;
  let httpClient: SpyObject<HttpClient>;
  let router: SpyObject<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: AuthService,
          useValue: createSpyObject(AuthService)
        },
        { provide: HttpClient, useValue: createSpyObject(HttpClient) },
        { provide: Router, useValue: createSpyObject(Router) }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    actions = TestBed.inject(Actions);
    authService = TestBed.inject(AuthService) as SpyObject<AuthService>;
    httpClient = TestBed.inject(HttpClient) as SpyObject<HttpClient>;
    router = TestBed.inject(Router) as SpyObject<Router>;
  });

  describe('$loadUser', () => {
    it('should dispatch loadUserSuccess', async(() => {
      const userId = '123';
      const user: UserInfoDTO = {
        givenName: 'John',
        familyName: 'Doe',
        pictureUrl: 'www.image.url',
        userId
      };

      const actions$ = cold('-x-', { x: AuthActions.loadUser });
      const httpGet$ = cold('-x-', { x: user });

      actions = actions$;
      httpClient.get.mockReturnValue(httpGet$);
      authService.getTokenUserId.mockReturnValue(userId);

      effects.$loadUser.subscribe(action => {
        expect(action).toEqual(AuthActions.loadUserSuccess({ user }));
      });
      Scheduler.instance.flush();
      expect(authService.getTokenUserId).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalledWith(`api/auth/user/${userId}`);
    }));

    it('should dispatch loadUserError on user undefined', async(() => {
      const userId = '123';
      const user = undefined;

      const actions$ = cold('-x-', { x: AuthActions.loadUser });
      const httpGet$ = cold('-x-', { x: user });

      actions = actions$;
      httpClient.get.mockReturnValue(httpGet$);
      authService.getTokenUserId.mockReturnValue(userId);

      effects.$loadUser.subscribe(action => {
        expect(action).toEqual(
          AuthActions.loadUserError({ error: 'User not found' })
        );
      });
      Scheduler.instance.flush();
      expect(authService.getTokenUserId).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalledWith(`api/auth/user/${userId}`);
    }));

    it('should dispatch loadUserError on error', async(() => {
      const userId = '123';
      const user = undefined;

      const actions$ = cold('-x-', { x: AuthActions.loadUser });
      const httpGet$ = cold('-#-x-', { x: user }, 'some error occured');

      actions = actions$;
      httpClient.get.mockReturnValue(httpGet$);
      authService.getTokenUserId.mockReturnValue(userId);

      effects.$loadUser.subscribe(action => {
        expect(action).toEqual(
          AuthActions.loadUserError({ error: 'some error occured' })
        );
      });
      Scheduler.instance.flush();
      expect(authService.getTokenUserId).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalledWith(`api/auth/user/${userId}`);
    }));
  });

  describe('$loadUserError', () => {
    it('should call router.navigateByUrl', async(() => {
      const actions$ = cold('-x-', { x: AuthActions.loadUserError });
      actions = actions$;
      effects.$loadUserError.subscribe();
      Scheduler.instance.flush();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    }));
  });

  describe('$readToken', () => {
    it('should call authService.setToken', async(() => {
      const actions$ = cold('-x-', {
        x: routerNavigatedAction({
          payload: {
            routerState: {
              root: {
                queryParams: {
                  _token: 'sometoken'
                }
              },
              url: '/login?_token=sometoken'
            }
          } as any
        })
      });
      actions = actions$;
      effects.$readToken.subscribe(action => {
        expect(action).toEqual(AuthActions.loginFlowSuccess());
      });
      Scheduler.instance.flush();
      expect(authService.setToken).toHaveBeenCalledWith('sometoken');
    }));

    it('should not call authService.setToken', () => {
      const actions$ = cold('-x-', {
        x: routerNavigatedAction({
          payload: {
            routerState: {
              url: '/some-other-url'
            }
          } as any
        })
      });
      actions = actions$;
      effects.$readToken.subscribe();
      Scheduler.instance.flush();
      expect(authService.setToken).not.toHaveBeenCalled();
    });
  });
});
