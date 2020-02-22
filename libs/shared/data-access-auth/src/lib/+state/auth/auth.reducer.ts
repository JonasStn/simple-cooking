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
  on(AuthActions.loginFlowSuccess, (state, _action) => ({
    ...state,
    loginSuccess: true
  })),
  on(AuthActions.loginFlowError, (state, action) => ({
    ...initialState,
    authError: action.error
  })),
  on(AuthActions.loadUser, state => ({
    ...state,
    currentUserLoading: true
  })),
  on(AuthActions.loadUserSuccess, (state, action) => ({
    ...initialState,
    loginSuccess: true,
    currentUser: action.user
  })),
  on(AuthActions.loadUserError, (state, action) => ({
    ...initialState,
    authError: action.error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
