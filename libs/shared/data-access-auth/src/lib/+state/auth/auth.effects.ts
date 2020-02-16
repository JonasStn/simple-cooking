import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  MinimalRouterStateSnapshot,
  ROUTER_NAVIGATED
} from '@ngrx/router-store';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';
import { of } from 'rxjs';
import { catchError, filter, map, pluck, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../services';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  $loadUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      map(() => this.authService.getTokenUserId()),
      filter(userId => !!userId),
      switchMap(userId =>
        this.httpClient.get<UserInfoDTO>(`api/auth/user/${userId}`).pipe(
          map(user =>
            user
              ? AuthActions.loadUserSuccess({ user })
              : AuthActions.loadUserError({ error: 'User not found' })
          ),
          catchError(error => of(AuthActions.loadUserError({ error })))
        )
      )
    )
  );

  $loadUserError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserError),
        tap(() => this.router.navigateByUrl('/login'))
      ),
    { dispatch: false }
  );

  /**
   * listens on router actions to /login?_token to read provided token
   * from backend api and save it to store
   */
  $readToken = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      pluck('payload', 'routerState'),
      filter((routerState: MinimalRouterStateSnapshot) =>
        routerState.url.startsWith('/login?_token')
      ),
      pluck('root', 'queryParams', '_token'),
      tap((token: string) => {
        this.authService.setToken(token);
      }),
      map((token: string) => AuthActions.loginFlowSuccess())
    )
  );
}
