import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  MinimalRouterStateSnapshot,
  ROUTER_NAVIGATED
} from '@ngrx/router-store';
import { filter, map, pluck, tap } from 'rxjs/operators';

import { AuthService } from '../../services';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
      map((token: string) => AuthActions.loginFlowSuccess({ token }))
    )
  );
}
