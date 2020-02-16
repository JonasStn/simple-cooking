import { createAction, props } from '@ngrx/store';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';

export const loginFlowSuccess = createAction('[Auth] Login Flow Success');

export const loginFlowError = createAction(
  '[Auth] Login Flow Error',
  props<{ error: any }>()
);

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: UserInfoDTO }>()
);

export const loadUserError = createAction(
  '[Auth] Load User Error',
  props<{ error: any }>()
);
