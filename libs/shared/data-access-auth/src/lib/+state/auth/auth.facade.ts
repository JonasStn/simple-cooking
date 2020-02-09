import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  authError$ = this.store.pipe(select(AuthSelectors.getAuthError));
  loginSuccess$ = this.store.pipe(select(AuthSelectors.getLoginSuccess));

  constructor(private store: Store<fromAuth.AuthPartialState>) {}
}
