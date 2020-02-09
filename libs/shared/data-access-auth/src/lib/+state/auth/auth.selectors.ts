import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURE_KEY, AuthPartialState, State } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthPartialState, State>(
  AUTH_FEATURE_KEY
);

export const getAuthError = createSelector(
  getAuthState,
  (state: State) => state.authError
);

export const getLoginSuccess = createSelector(
  getAuthState,
  (state: State) => state.loginSuccess
);
