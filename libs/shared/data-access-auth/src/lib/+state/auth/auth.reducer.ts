import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  token: string;
  authError: any;
  loginSuccess: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  token: null,
  authError: null,
  loginSuccess: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginFlowSuccess, (state, action) => ({
    ...state,
    token: action.token,
    loginSuccess: true
  })),
  on(AuthActions.loginFlowError, (state, action) => ({
    ...state,
    token: null,
    authError: action.error,
    loginSuccess: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
