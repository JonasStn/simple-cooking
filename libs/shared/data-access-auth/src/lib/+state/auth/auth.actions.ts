import { createAction, props } from '@ngrx/store';

export const loginFlowSuccess = createAction(
  '[Auth] Login Flow Success',
  props<{ token: string }>()
);
export const loginFlowError = createAction(
  '[Auth] Login Flow Error',
  props<{ error: any }>()
);

export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction('[Auth] Load User');
export const loadUserError = createAction('[Auth] Load User');
