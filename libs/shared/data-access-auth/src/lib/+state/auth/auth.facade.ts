import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  authError$ = this.store.pipe(select(AuthSelectors.getAuthError));
  loginSuccess$ = this.store.pipe(select(AuthSelectors.getLoginSuccess));
  user$ = this.store.pipe(select(AuthSelectors.getUser));
  userLoading$ = this.store.pipe(select(AuthSelectors.getUserLoading));

  constructor(private store: Store<fromAuth.AuthPartialState>) {}

  loadUser() {
    this.store.dispatch(AuthActions.loadUser());
  }
}
