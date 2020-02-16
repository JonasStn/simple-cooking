import { Action, createReducer, on } from '@ngrx/store';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  authError: any;
  loginSuccess: boolean;
  currentUser: UserInfoDTO;
  currentUserLoading: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  authError: null,
  loginSuccess: false,
  currentUser: null,
  currentUserLoading: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginFlowSuccess, (state, action) => ({
    ...state,
    loginSuccess: true
  })),
  on(AuthActions.loginFlowError, (state, action) => ({
    ...state,
    token: null,
    authError: action.error,
    loginSuccess: false
  })),
  on(AuthActions.loadUser, state => ({
    ...state,
    currentUserLoading: true
  })),
  on(AuthActions.loadUserSuccess, (state, action) => ({
    ...state,
    currentUserLoading: false,
    loginSuccess: true,
    currentUser: action.user
  })),
  on(AuthActions.loadUserError, (state, action) => ({
    ...state,
    currentUser: null,
    currentUserLoading: false,
    loginSuccess: false,
    authError: action.error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
