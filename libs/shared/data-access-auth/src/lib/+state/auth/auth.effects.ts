import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromAuth from './auth.reducer';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loadAuth$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.loadAuth, {
      run: (
        action: ReturnType<typeof AuthActions.loadAuth>,
        state: fromAuth.AuthPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return AuthActions.loadAuthSuccess({ auth: [] });
      },

      onError: (action: ReturnType<typeof AuthActions.loadAuth>, error) => {
        console.error('Error', error);
        return AuthActions.loadAuthFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromAuth.AuthPartialState>
  ) {}
}
