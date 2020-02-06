import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  allAuth$ = this.store.pipe(select(AuthSelectors.getAllAuth));
  selectedAuth$ = this.store.pipe(select(AuthSelectors.getSelected));

  constructor(private store: Store<fromAuth.AuthPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
